
import CustomAvatar from '@/components/custom-avatar'
import { Text } from '@/components/text'
import React from 'react'
type Props = {
    name: string,
    avatarUrl?:string;
    shape?: 'circle'| 'square';
}
const SelectOptionWithAvatar = ({avatarUrl, name, shape}: Props) => {
  return (
    <div
    style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    }}
    >
        <CustomAvatar shape={shape} name={name} src={avatarUrl} />
        <Text>{name}</Text>
    </div>
  )
}

export default SelectOptionWithAvatar