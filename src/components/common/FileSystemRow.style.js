import React from "react";
import styled from "styled-components";
import { FileSystemRowColors } from "./colors";

const FileSystemRowStyle = styled.div`
  padding: 4px 8px 4px 8px;
  cursor: pointer;
  background-color: ${props =>
    props.isSelected
      ? FileSystemRowColors.get("Selected")
      : FileSystemRowColors.get("Background")};

  &:hover {
    background-color: ${props =>
      props.isSelected
        ? FileSystemRowColors.get("Selected")
        : FileSystemRowColors.get("Hover")};
  }
`;

export default FileSystemRowStyle;
