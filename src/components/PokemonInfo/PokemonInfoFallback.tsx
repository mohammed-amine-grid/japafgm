import type {FallbackProps, ErrorBoundaryProps} from 'react-error-boundary'
import {ErrorBoundary} from 'react-error-boundary'



function ErrorFallback({error, resetErrorBoundary}: FallbackProps) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function PokemonErrorBoundary(
  props: Pick<ErrorBoundaryProps, 'onReset' | 'resetKeys'> & {
    children: React.ReactNode
  },
) {
  return <ErrorBoundary FallbackComponent={ErrorFallback} {...props} />
}

export  {
    PokemonErrorBoundary,
    ErrorFallback
}
