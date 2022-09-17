import { Notification } from '@mantine/core'
interface EmailVerifiedNotiProps {
  verified?: boolean
}
export default function EmailVerifiedNoti({
  verified,
}: EmailVerifiedNotiProps) {
  if (verified === true) {
    return null
  } else {
    return (
      <Notification
        color='red'
        sx={{
          width: '50%',
          position: 'absolute',
          left: 0,
          right: 0,
          margin: '0 auto',
          top: 10,
          zIndex: 999,
        }}
        disallowClose
      >
        이메일 확인이 필요합니다.
      </Notification>
    )
  }
}
