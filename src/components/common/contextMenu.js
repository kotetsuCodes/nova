import React from "react";
import styled from "styled-components";

const ContextMenuStyle = styled.div`
  background-color: rgb(30, 30, 30);
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  z-index: 100;
  width: 500px;
`;

const ContextMenuWrapperStyle = styled.div`
  padding-left: 0 !important;
  padding-right: 0 !important;
`;

const ContextMenuItemStyle = styled.div`
  background-color: rgb(30, 30, 30);
  padding: 8px 8px 8px 8px;

  &:hover {
    background-color: rgb(63, 63, 70);
  }
`;

const ContextMenuItemIconStyle = styled.div`
  padding-left: 0 !important;
  padding-right: 0 !important;
  max-width: 24px !important;
`;

const ContextMenuItemLabelStyle = styled.div`
  padding-left: 0 !important;
  padding-right: 0 !important;
`;

export class ContextMenu extends React.Component {
  render() {
    const {
      visible,
      x,
      y,
      currentSelected,
      showPropertiesDialog,
      deleteFile,
      openFile,
      renameFile
    } = this.props;
    console.log("x,y", x, y);
    let menu = visible ? (
      <ContextMenuStyle className="row" x={x + 5} y={y}>
        <ContextMenuWrapperStyle className="col-12">
          <ContextMenuItemStyle className="row" onClick={openFile}>
            <ContextMenuItemIconStyle className="col-1">
              <i className="fa fa-external-link" />
            </ContextMenuItemIconStyle>
            <ContextMenuItemLabelStyle className="col-11">
              Open
            </ContextMenuItemLabelStyle>
          </ContextMenuItemStyle>

          <ContextMenuItemStyle className="row" onClick={deleteFile}>
            <ContextMenuItemIconStyle className="col-1">
              <i className="fa fa-trash" />
            </ContextMenuItemIconStyle>
            <ContextMenuItemLabelStyle className="col-11">
              Delete
            </ContextMenuItemLabelStyle>
          </ContextMenuItemStyle>

          <ContextMenuItemStyle className="row" onClick={renameFile}>
            <ContextMenuItemIconStyle className="col-1">
              <i className="fa fa-pencil-square-o" />
            </ContextMenuItemIconStyle>
            <ContextMenuItemLabelStyle className="col-11">
              Rename
            </ContextMenuItemLabelStyle>
          </ContextMenuItemStyle>

          <ContextMenuItemStyle className="row" onClick={showPropertiesDialog}>
            <ContextMenuItemIconStyle className="col-1">
              <i className="fa fa-cog" />
            </ContextMenuItemIconStyle>
            <ContextMenuItemLabelStyle className="col-11">
              Properties
            </ContextMenuItemLabelStyle>
          </ContextMenuItemStyle>
        </ContextMenuWrapperStyle>
      </ContextMenuStyle>
    ) : null;

    console.log("visible", visible);

    return menu;
  }
}
