import React from 'react'
import {Avatar, Badge } from 'antd'

export default function AvatarWithLevel({level, user}) {
    return (
        <React.Fragment>
        <div style={{padding: 0, textAlign: 'center'}}>
        <Badge count={level}>
          <Avatar style={{ backgroundColor: user.color, verticalAlign: 'middle' }} size="medium">
          {user.nickname[0]}
        </Avatar>
        </Badge>
        </div>
        </React.Fragment>
    )
}
