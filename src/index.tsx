import * as React from 'react'
import * as ReactDOM from 'react-dom'
import p5 from 'p5'

const defaultExport = (mod: { default: (p: p5) => void }) => mod.default

const sketches = {
  joyDivision: () => import('./joy-division'),
  tiledLines: () => import('./tiled-lines'),
  triangles: () => import('./triangles'),
  imagePixels: () => import('./imagePixels'),
}

type SketchName = keyof typeof sketches

function App() {
  const sketchRef = React.useRef<p5 | undefined>()

  const [selectedSketchName, setSelectedSketchName] =
    React.useState<SketchName>(
      (localStorage.getItem('sketch') as SketchName) ?? 'joyDivision'
    )

  React.useEffect(() => {
    const importSketch = sketches[selectedSketchName]

    importSketch()
      .then(defaultExport)
      .then((sketch) => {
        const sketchEl = document.getElementById('sketch')

        if (sketchEl) {
          sketchRef.current = new p5(sketch, sketchEl)
        }
      })

    return () => {
      sketchRef.current?.remove()
    }
  }, [selectedSketchName])

  return (
    <main className='container flex flex-row'>
      <section>
        <ul id='sketch-list'>
          {Object.keys(sketches).map((sketchName) => (
            <SketchButton
              key={sketchName}
              sketchName={sketchName as SketchName}
              isSelected={sketchName === selectedSketchName}
              onClick={() => {
                setSelectedSketchName(sketchName as SketchName)
                localStorage.setItem('sketch', sketchName)
              }}
            />
          ))}
        </ul>
      </section>
      <section className='px-16'>
        <Frame>
          <div id='sketch' />
        </Frame>
      </section>
    </main>
  )
}

interface SketchButtonProps {
  sketchName: SketchName
  isSelected: boolean
  onClick: () => void
}

function SketchButton({ sketchName, isSelected, onClick }: SketchButtonProps) {
  const className = ['text-blue-600 underline', isSelected && 'font-bold']
    .filter(Boolean)
    .join(' ')

  return (
    <li key={sketchName}>
      <button className={className} onClick={onClick}>
        {sketchName}
      </button>
    </li>
  )
}

interface FrameProps {
  children: React.ReactNode
}

function Frame({ children }: FrameProps) {
  return (
    <div className='frame-border'>
      <div className='frame-inset'>{children}</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
