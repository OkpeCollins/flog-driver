import React from 'react';
import Svg, { Path, G, Rect, Defs, ClipPath } from 'react-native-svg';
import { hp, wp } from '../../../constants/dimension';

function LogoutIcon() {
  return (
    <Svg width={wp(24)} height={hp(24)} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0)">
        <Path d="M14.9998 13.0001C14.4469 13.0001 13.9999 13.4482 13.9999 14V18.0001C13.9999 18.5511 13.5519 19.0001 12.9998 19.0001H9.99983V4.0002C9.99983 3.14621 9.45583 2.38322 8.63791 2.09922L8.34183 2.00016H12.9998C13.5519 2.00016 13.9999 2.44913 13.9999 3.00028V6.00025C13.9999 6.55212 14.4469 7.00017 14.9998 7.00017C15.5528 7.00017 15.9998 6.55212 15.9998 6.00025V3.00028C15.9998 1.3463 14.6538 0.000305176 12.9998 0.000305176H2.24998C2.21189 0.000305176 2.18003 0.0173338 2.14304 0.0222776C2.09489 0.0182493 2.04893 0.000305176 2.00004 0.000305176C0.897024 0.000305176 0 0.897147 0 2.00016V20C0 20.854 0.544001 21.617 1.36192 21.901L7.37999 23.9071C7.58397 23.97 7.78684 24.0001 7.99998 24.0001C9.10299 24.0001 9.99983 23.103 9.99983 22V21.0001H12.9998C14.6538 21.0001 15.9998 19.6541 15.9998 18.0001V14C15.9998 13.4482 15.5528 13.0001 14.9998 13.0001Z" fill="#ACFF79"/>
        <Path d="M23.707 9.29317L19.7069 5.29327C19.4211 5.00726 18.991 4.9212 18.6171 5.07611C18.2441 5.2312 18 5.59612 18 6.00023V9.0002H14.0001C13.4481 9.0002 13 9.44807 13 10.0001C13 10.5522 13.4481 11.0001 14.0001 11.0001H18V14C18 14.4041 18.2441 14.7691 18.6171 14.9242C18.991 15.0791 19.4211 14.993 19.7069 14.7072L23.707 10.7071C24.0979 10.3162 24.0979 9.6841 23.707 9.29317Z" fill="#ACFF79"/>
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="24" height="24" fill="white"/>
        </ClipPath>
      </Defs>
    </Svg>

  )
}

export default LogoutIcon;