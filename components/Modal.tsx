import { animated as a, useTransition } from 'react-spring'
import { switcherModalRef } from 'store/switcher'
import useLockBodyScroll from 'utils/useLockBodyScroll'

type SimpleModalProps = {
  open: boolean
  children: JSX.Element | JSX.Element[]
}

function SimpleModal(props: SimpleModalProps) {
  const { open } = props

  const transition = useTransition(open, null, {
    ref: switcherModalRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  useLockBodyScroll(open)

  return (
    <>
      {transition.map(
        ({ item, key, props: springProps }) =>
          item && (
            <a.div
              key={key}
              className="fixed z-50 inset-0 overflow-hidden"
              style={{ opacity: springProps.opacity }}
            >
              <div className="flex items-end justify-center h-screen pt-4 pb-20 text-center sm:block sm:p-0">
                <style jsx>{`
                  ::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-100 opacity-75" />
                </div>
                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
                <div
                  className="inline-block align-bottom mb-16 rounded-lg text-left overflow-hidden overflow-y-scroll h-screen transform sm:my-16 sm:align-middle sm:w-full sm:px-1 sm:pb-16 z-20"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  {props.children}
                </div>
              </div>
            </a.div>
          )
      )}
    </>
  )
}

export default SimpleModal