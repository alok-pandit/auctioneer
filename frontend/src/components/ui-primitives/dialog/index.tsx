import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import AnimatedButton from '../button'

import {
  CloseBtn,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  Div
} from './styles'

export interface IDialogProps {
  dialogTriggerText: string
  dialogTitleText: string
  dialogDescriptionText?: string
  submitBtnText?: string
  submitBtnFn?: () => void
  children?: React.ReactNode
  hideTrigger?: boolean
}

const PopupDialog = (props: IDialogProps) => (
  <Dialog.Root defaultOpen={props.hideTrigger}>
    {!props.hideTrigger && (
      <Dialog.Trigger asChild>
        <span>
          <AnimatedButton title={props.dialogTriggerText} />
        </span>
      </Dialog.Trigger>
    )}
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>{props.dialogTitleText}</DialogTitle>
        <DialogDescription>{props.dialogDescriptionText}</DialogDescription>
        {props.children}
        <Div>
          <Dialog.Close asChild>
            <span>
              <AnimatedButton
                onClick={props.submitBtnFn}
                title={props.submitBtnText ?? 'Submit'}
              />
            </span>
          </Dialog.Close>
        </Div>
        <Dialog.Close asChild>
          <CloseBtn aria-label="Close">
            <Cross2Icon />
          </CloseBtn>
        </Dialog.Close>
      </DialogContent>
    </Dialog.Portal>
  </Dialog.Root>
)

export default PopupDialog
