export const Scene = <const>{
  top: 'top',
  name: 'name',
  background: 'background',
  confirm: 'confirm',
  complete: 'complete',
}

export type Scene = typeof Scene[keyof typeof Scene]
