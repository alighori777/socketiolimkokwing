import React from "react";
import Icon from '@ant-design/icons';

const PlusSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor">
        <g transform="translate(0.478)">
            <rect width="1em" height="1em" transform="translate(-0.478)" opacity="0"/>
            <path d="M200.75,907.25h-7.5a1.25,1.25,0,0,1,0-2.5h7.5v-7.5a1.25,1.25,0,0,1,2.5,0v7.5h7.5a1.25,1.25,0,0,1,0,2.5h-7.5v7.5a1.25,1.25,0,0,1-2.5,0v-7.5Z" transform="translate(-192.478 -896)" fillRule="evenodd"/>
        </g>
    </svg>
  );

  const PlusIcon = props => <Icon component={PlusSvg} {...props} />;

  export default PlusIcon;