import React, { useEffect } from "react";
import { observer } from "mobx-react";
import VisibilitySensor from "react-visibility-sensor";
import ProfileReadOnly from "./ProfileReadOnly";
import ItemListItem from "./ItemListItem";

function onChange(item, isVisible) {
  item.setVisibility(isVisible);
  const videoElm = document.getElementById(item.id);
  if (videoElm) {
    if (isVisible) {
      videoElm.play();
    } else {
      videoElm.pause();
    }
  } else {
    console.log("not found");
  }
}

function onChangeRefresh(store, isVisible) {
  if (isVisible) {
    store.refresh();
    const a = store.items.length;
    console.log(a);
  }
}

function ItemList({ store }) {
  useEffect(() => {
    setTimeout(() => {
      store.items
        .filter(x => x.isVisible)
        .map(items => {
          onChange(items, true);
        });
    }, 1);
  });

  return (
    <div className="item-container">
      <div className="item-list">
        <VisibilitySensor
          offset={{ top: 80 }}
          onChange={isVisible => onChangeRefresh(store, isVisible)}
        >
          <div className="refresh-div">dra för att ladda</div>
        </VisibilitySensor>

        {!store.selectedProfile && <ItemListItem store={store} />}
        {store.selectedProfile && <ProfileReadOnly store={store} />}
      </div>
    </div>
  );
}

export default observer(ItemList);
