import Icon from './Icon.jsx'

export default function ToastMessage({ message }) {
  if (!message) return null

  return (
    <div className="toast" role="status" aria-live="polite">
      <Icon name="check" />
      {message}
    </div>
  )
}
