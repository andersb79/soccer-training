import React from "react";
import { observer } from "mobx-react";
import { Video } from "cloudinary-react";

function VideoControl({ store, settings }) {
  function goFullScreen(settings) {
    document.getElementById(settings.id).webkitEnterFullscreen();
  }

  if (settings.hasSharedPath) {
    return (
      <video
        onClick={() => goFullScreen(settings)}
        id={settings.id}
        loop
        playsInline
        preload="none"
        muted
        width="100%"
        height="100%"
        poster={settings.dropboxPoster}
      >
        <source src={settings.dropboxLink} type="video/mp4" />
      </video>
    );
  }

  return (
    <Video
      onClick={() => goFullScreen(settings)}
      id={settings.id}
      cloudName="deolievif"
      publicId={settings.publicId}
      width="100%"
      height="100%"
      loop
      muted
      playsInline
      preload="none"
      poster={settings.poster}
    />
  );
}

export default observer(VideoControl);
