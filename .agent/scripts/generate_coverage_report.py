import os
import glob
import datetime
import subprocess
import xml.etree.ElementTree as ET

def run_git_command(args):
    try:
        result = subprocess.run(args, capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError:
        return "N/A"

def get_git_info():
    branch = run_git_command(['git', 'rev-parse', '--abbrev-ref', 'HEAD'])
    commit = run_git_command(['git', 'rev-parse', '--short', 'HEAD'])
    # Try to get the latest tag, if fails, return N/A
    version = run_git_command(['git', 'describe', '--tags', '--abbrev=0'])
    if version == "N/A" or not version:
        version = "0.0.0 (No tags)"
    return branch, commit, version

def get_traffic_light(percentage):
    if percentage >= 85:
        return "🟢"
    elif percentage >= 70:
        return "🟡"
    elif percentage >= 50:
        return "🟠"
    elif percentage >= 20:
        return "🔴"
    else:
        return "⚫"

def generate_report():
    # Find the latest coverage file recursively
    list_of_files = glob.glob('**/coverage.cobertura.xml', recursive=True)
    if not list_of_files:
        print("ERROR: No coverage file found! Did you run `dotnet test --collect:\"XPlat Code Coverage\"`?")
        exit(1)

    # Get the most recently modified file
    latest_file = max(list_of_files, key=os.path.getmtime)
    print(f"Processing coverage file: {latest_file}")
    
    try:
        tree = ET.parse(latest_file)
        root = tree.getroot()
    except Exception as e:
        print(f"Error parsing XML: {e}")
        exit(1)
    
    # Calculate overall line coverage
    line_rate = float(root.attrib.get('line-rate', 0))
    coverage_percentage = line_rate * 100
    
    # Get Git Info
    branch, commit, version = get_git_info()
    
    today_str = datetime.datetime.now().strftime("%Y-%m-%d")
    report_filename = f"docs/coverage_{today_str}.md"
    
    markdown = []
    markdown.append(f"# Code Coverage Report - {today_str}")
    markdown.append(f"**Generated on**: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    markdown.append("")
    markdown.append(f"- **Version**: {version}")
    markdown.append(f"- **Branch**: {branch}")
    markdown.append(f"- **Commit**: {commit}")
    markdown.append("")
    
    overall_traffic = get_traffic_light(coverage_percentage)
    markdown.append(f"### Overall Line Coverage: {overall_traffic} {coverage_percentage:.2f}%")
    markdown.append("")
    
    markdown.append("## Coverage Breakdown by Assembly")
    markdown.append("| Status | Assembly | Line Coverage | Branch Coverage |")
    markdown.append("| :---: | :--- | :---: | :---: |")
    
    # Iterate over packages and classes to aggregate by namespace
    namespace_stats = {}
    
    packages = root.findall('.//package')
    if not packages:
        markdown.append("| | No assemblies found | - | - |")
    else:
        for package in packages:
            name = package.get('name')
            p_line_rate = float(package.get('line-rate', 0)) * 100
            p_branch_rate = float(package.get('branch-rate', 0)) * 100
            traffic = get_traffic_light(p_line_rate)
            markdown.append(f"| {traffic} | {name} | {p_line_rate:.2f}% | {p_branch_rate:.2f}% |")

            # Process classes within the package for namespace breakdown
            classes = package.findall('.//class')
            for cls in classes:
                full_class_name = cls.get('name')
                # Extract namespace (everything before the last dot)
                if '.' in full_class_name:
                    namespace = full_class_name.rsplit('.', 1)[0]
                else:
                    namespace = "<global>"
                
                # We need to manually count lines for aggregation because class doesn't always have summary attributes
                lines = cls.findall('.//lines/line')
                total_lines = len(lines)
                covered_lines = sum(1 for line in lines if int(line.get('hits', 0)) > 0)
                
                if namespace not in namespace_stats:
                    namespace_stats[namespace] = {'total': 0, 'covered': 0}
                
                namespace_stats[namespace]['total'] += total_lines
                namespace_stats[namespace]['covered'] += covered_lines

    markdown.append("")
    markdown.append("## Coverage Breakdown by Module (Namespace)")
    markdown.append("| Status | Module | Line Coverage | Total Lines |")
    markdown.append("| :---: | :--- | :---: | :---: |")
    
    if not namespace_stats:
         markdown.append("| | No modules found | - | - |")
    else:
        # Sort by namespace name
        for ns in sorted(namespace_stats.keys()):
            stats = namespace_stats[ns]
            total = stats['total']
            covered = stats['covered']
            percentage = (covered / total * 100) if total > 0 else 0
            traffic = get_traffic_light(percentage)
            
            markdown.append(f"| {traffic} | {ns} | {percentage:.2f}% | {total} |")

    markdown.append("")
    markdown.append("## End-to-End Tests (Scenarios)")
    markdown.append("*(This section is a placeholder for future end-to-end test results)*")
    markdown.append("")

    # Ensure docs directory exists
    os.makedirs('docs', exist_ok=True)
    
    with open(report_filename, 'w') as f:
        f.write('\n'.join(markdown))
        
    print(f"Successfully generated report at: {report_filename}")

if __name__ == "__main__":
    generate_report()
