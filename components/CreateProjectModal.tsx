import { Modal } from '@mantine/core'
import CraeteProject from './CreateProject'

interface CreateProjectModal {
  opened: boolean
  closeFn: () => void
}

export default function CreateProjectModal({
  opened,
  closeFn,
}: CreateProjectModal) {
  return (
    <Modal centered opened={opened} onClose={closeFn} title='프로젝트 만들기'>
      <CraeteProject />
    </Modal>
  )
}
