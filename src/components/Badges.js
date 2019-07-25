import React from "react";
import { observer } from "mobx-react";
import SecurityIcon from "@material-ui/icons/Security";

function Badges({ store, user }) {
  return (
    <div>
      {user.badges.map(category => (
        <div>
          {category.title}
          {category.prices.map(badge => (
            <div>
              <SecurityIcon style={{ color: badge.color }} />
              {badge.count} {badge.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default observer(Badges);
