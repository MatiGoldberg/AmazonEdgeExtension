---
description: Review, refine, and plan a feature request from a text or file input.
---

1.  **Analyze the Input**:
    *   If the user provided a file path, read the file using `view_file`.
    *   If the user provided text, determine a suitable filename (e.g., `FeatureRequests/feature-name.md`) and create the file with the provided text using `write_to_file`. Ensure the directory `FeatureRequests` exists.
    *   If the file content is empty or the text is minimal, start a draft with a title and a `**Status:** Draft` line.

2.  **Review and Clarify**:
    *   Analyze the feature request for clarity, completeness, and potential edge cases.
    *   Identify any missing information (e.g., UI/UX details, specific logic, error handling, data requirements).
    *   **STOP and Ask the User**: Present your analysis and a list of clarifying questions to the user. Wait for their response.

3.  **Refine and Plan**:
    *   Based on the user's answers and the initial request, update the feature request file.
    *   Ensure the file has the following structure:
        *   **Title**: Clear and descriptive.
        *   **Status**: One of `Draft`, `Ready for Implementation`, `Completed`, `Cut`. (Likely `Draft` or `Ready for Implementation` at this stage).
        *   **Overview**: High-level summary of the feature.
        *   **Details**: Specific requirements, behaviors, and constraints.
        *   **Technical Implementation Plan**: A step-by-step workplan for implementing the feature. This should be detailed enough for another agent to pick up.
    *   Use `replace_file_content` or `multi_replace_file_content` to update the file.

4.  **Final Verification**:
    *   Read the updated file to ensure it is correct and comprehensive.
    *   Ask the user: "The feature request has been refined and a workplan added. The status is now [Status]. would you like to move on to implement it?"
