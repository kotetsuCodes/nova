import React from "react";
import styled from "styled-components";
import FileSystemRowStyle from "../common/FileSystemRow.style";
import { getIconForFile } from "../../utility/icons";

const FileLabel = styled.span`
  padding-left: 8px;
  ${props => (props.isEditing ? "display: none" : "display: inline")};
`;

const FileIcon = styled.img`
  height: 32px;
  height: 32px;
`;

const FileDetail = styled.div`
  text-align: center;
`;

const FileNameInput = styled.input`
  padding: 8px 16px 8px 16px;
  border-radius: 4px;
  background-color: rgb(37, 37, 38);
  color: #cccccc;
  font-size: 0.95rem;
  border: 1px solid #cccccc;
  width: 100%;
  outline: none;

  ${props => (props.isEditing ? "display: inline" : "display: none")};
`;

export default class File extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      fileName: this.props.fileInfo.Name
    };
  }

  updateFileName = e => {
    this.state.fileName = e.target.value;
  };

  render() {
    const {
      fileInfo,
      setSelected,
      openContextMenu,
      openFileSystemEntry
    } = this.props;

    return (
      <FileSystemRowStyle
        className="row align-items-center"
        isSelected={fileInfo.isSelected}
        onContextMenu={event => openContextMenu(event, fileInfo)}
        onClick={event => setSelected(fileInfo)}
        onDoubleClick={event => openFileSystemEntry(fileInfo)}
      >
        <div className="col-sm-4">
          <div className="row align-items-center">
            <div className="col-sm-2">
              <FileIcon src={getIconForFile(fileInfo.Name)} />
            </div>
            <div className="col-sm-10">
              <FileNameInput
                type="text"
                defaultValue={this.state.fileName}
                autoFocus={fileInfo.isEditing}
                onChange={this.updateFileName}
                isEditing={fileInfo.isEditing}
              />
              <FileLabel isEditing={fileInfo.isEditing}>
                {fileInfo.Name}
              </FileLabel>
            </div>
          </div>
        </div>
        <FileDetail className="col">{fileInfo.CreationTime}</FileDetail>
        <FileDetail className="col">{fileInfo.LastWriteTime}</FileDetail>
        <FileDetail className="col">{fileInfo.LastAccessTime}</FileDetail>
        <FileDetail className="col">{fileInfo.Attributes}</FileDetail>
        <FileDetail className="col">{fileInfo.Size}</FileDetail>
      </FileSystemRowStyle>
    );
  }
}
