import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as fileSystemActions from "../../actions/fileSystemActions";
import PathBreadCrumb from "../common/PathBreadCrumb";
import { DirectoryViewContainer } from "../common/DirectoryViewContainer.style";
import { ColumnHeader } from "../common/columnHeader";
import Drive from "../common/Drive";
import Directory from "../common/Directory";
import File from "../common/File";
import { ContextMenu } from "../common/contextMenu";
import styled from "styled-components";
import FileSystemRowStyle from "../common/FileSystemRow.style";
import {
  WindowFrame,
  TitleBar,
  NovaIcon,
  CloseButton,
  MinimizeButton,
  MaximizeButton
} from "../common/WindowFrame.style";
import _ from "lodash";

const UpDirectory = styled.div`
  cursor: pointer;
`;

const UpDirectoryIcon = styled.i`
  color: #4f96ac;
`;

class DirectoryView extends React.Component {
  componentWillMount() {
    this.props.actions.getFileSystemEntries(process.env.REACT_APP_STARTPATH);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  handleKeyPress = event => {
    const selectedItemIndex = this.props.fileSystemEntries.Entries.findIndex(
      item => item.isSelected
    );

    if (selectedItemIndex > -1) {
      switch (event.keyCode) {
        case 113:
          //rename file
          console.log("renaming file...");
          this.props.actions.setEditing(
            this.props.fileSystemEntries.Entries.find(x => x.isSelected)
          );
          break;
        case 46:
          const selectedItem = this.props.fileSystemEntries.Entries.find(
            item => item.isSelected
          );

          if (selectedItem && selectedItem.isEditing === false) {
            this.props.actions.deleteFileSystemEntry(
              this.props.fileSystemEntries.Entries[selectedItemIndex]
            );
          }
          break;
        case 38:
          event.preventDefault();
          if (
            this.props.fileSystemEntries.Entries[selectedItemIndex] ===
            this.props.fileSystemEntries.Entries[0]
          ) {
            this.props.actions.setSelected(
              _.last(this.props.fileSystemEntries.Entries)
            );
          } else {
            this.props.actions.setSelected(
              this.props.fileSystemEntries.Entries[selectedItemIndex - 1]
            );
          }
          break;
        case 40:
          event.preventDefault();
          if (
            this.props.fileSystemEntries.Entries[selectedItemIndex] ===
            _.last(this.props.fileSystemEntries.Entries)
          ) {
            this.props.actions.setSelected(
              _.first(this.props.fileSystemEntries.Entries)
            );
          } else {
            this.props.actions.setSelected(
              this.props.fileSystemEntries.Entries[selectedItemIndex + 1]
            );
          }
          break;
      }
    }
  };

  changeWorkingDirectory = item => {
    console.log(`changing working directory to: ${item.FullName}`);
    this.props.actions.getFileSystemEntries(item.FullName);
    console.log("changeWorkingDirectory after change", this.props);
  };

  deleteFile = () => {
    this.props.actions.deleteFileSystemEntry(
      this.props.fileSystemEntries.Entries.find(x => x.isSelected)
    );
  };

  upDirectory = path => {
    console.log(
      "upDirectory currentWorkingDirectory",
      this.props.fileSystemEntries.CurrentWorkingDirectory + "\\.."
    );
    let directory =
      this.props.fileSystemEntries.CurrentWorkingDirectory + "\\..";
    if (/^[a-zA-Z]:\\\\?\.\.$/.test(directory)) {
      console.log("drive matched. changing to /");
      directory = "/";
    }

    this.props.actions.getFileSystemEntries(directory);
  };

  openContextMenu = (event, fileInfo) => {
    console.log("click handled", event);
    this.props.actions.setSelected(fileInfo);
    this.props.actions.openContextMenu(
      fileInfo,
      true,
      event.clientX,
      event.clientY
    );
  };

  showPropertiesDialog = () => {
    this.props.actions.showPropertiesDialog(
      this.props.fileSystemEntries.Entries.find(x => x.isSelected)
    );
  };

  openFile = () => {
    this.props.actions.openFileSystemEntry(
      this.props.fileSystemEntries.Entries.find(x => x.isSelected)
    );
  };

  setSelected = fileInfo => {
    if (!fileInfo.isEditing) {
      this.props.actions.setSelected(fileInfo);
    }
  };

  renameFile = () => {
    this.props.actions.setEditing(
      this.props.fileSystemEntries.Entries.find(x => x.isSelected)
    );
  };

  render() {
    const {
      fileSystem,
      fileSystemEntries,
      actions: { openFileSystemEntry, closeNova, minimizeNova, maximizeNova }
    } = this.props;
    let upDirectory = (
      <div className="row">
        <div className="col">&nbsp;</div>
      </div>
    );

    let columnHeaders = [{ headerTitle: "Drive Name", className: "col-12" }];

    if (fileSystemEntries.CurrentWorkingDirectory !== "/") {
      upDirectory = (
        <FileSystemRowStyle className="row align-items-center">
          <div className="col-sm-4">
            <div className="row align-items-center justify-content-middle">
              <div className="col-sm-2">
                <UpDirectory onClick={() => this.upDirectory()}>
                  <UpDirectoryIcon className="fa fa-2x fa-level-up" />
                </UpDirectory>
              </div>
              <div className="col-sm-10 justify-content-start">..</div>
            </div>
          </div>

          <div className="col" />
          <div className="col" />
          <div className="col" />
          <div className="col" />
          <div className="col" />
        </FileSystemRowStyle>
      );

      columnHeaders = [
        { headerTitle: "Name", className: "col-4" },
        { headerTitle: "Created", className: "col" },
        { headerTitle: "Modified", className: "col" },
        { headerTitle: "Accessed", className: "col" },
        { headerTitle: "Attributes", className: "col" },
        { headerTitle: "Size", className: "col" }
      ];
    }

    return (
      <div id={this.props.id}>
        <WindowFrame className="row">
          <NovaIcon className="col align-self-start">
            <i className="fa fa-bolt" />
          </NovaIcon>
          <TitleBar className="col align-self-start">Nova</TitleBar>
          <MinimizeButton className="col align-self-end" onClick={minimizeNova}>
            <i className="fa fa-minus" />
          </MinimizeButton>
          <MaximizeButton className="col align-self-end" onClick={maximizeNova}>
            <i className="fa fa-window-restore" />
          </MaximizeButton>
          <CloseButton className="col align-self-end" onClick={closeNova}>
            <i className="fa fa-times" />
          </CloseButton>
        </WindowFrame>
        <PathBreadCrumb
          currentWorkingDirectory={fileSystemEntries.CurrentWorkingDirectory}
        />

        <ColumnHeader headers={columnHeaders} />
        {upDirectory}

        <DirectoryViewContainer className="row">
          <div className="col">
            {fileSystemEntries.Entries.map((item, index) => {
              if (item.Type === "Drive") {
                return (
                  <Drive
                    Key={item.Name}
                    driveInfo={item}
                    changeWorkingDirectory={this.changeWorkingDirectory}
                    setSelected={this.setSelected}
                  />
                );
              } else if (item.Type === "Directory") {
                return (
                  <Directory
                    Key={item.Name}
                    directoryInfo={item}
                    changeWorkingDirectory={this.changeWorkingDirectory}
                    setSelected={this.setSelected}
                  />
                );
              } else {
                return (
                  <File
                    Key={item.Name}
                    fileInfo={item}
                    openContextMenu={this.openContextMenu}
                    setSelected={this.setSelected}
                    openFileSystemEntry={openFileSystemEntry}
                  />
                );
              }
            })}
          </div>
        </DirectoryViewContainer>

        <ContextMenu
          visible={fileSystemEntries.ContextMenuVisible}
          x={fileSystemEntries.x}
          y={fileSystemEntries.y}
          currentSelected={fileSystemEntries.Entries.find(x => x.isSelected)}
          showPropertiesDialog={this.showPropertiesDialog}
          deleteFile={this.deleteFile}
          openFile={this.openFile}
          renameFile={this.renameFile}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    fileSystemEntries: state.fileSystemEntries
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(fileSystemActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryView);
