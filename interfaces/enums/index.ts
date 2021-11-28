export const Scene = <const>{
  top: 'top',
  name: 'name',
  background: 'background',
  confirm: 'confirm',
  complete: 'complete',
}

export const BackgroundScene = <const>{
  select: 'select',
  edit: 'edit',
}

export type Scene = typeof Scene[keyof typeof Scene]
export type BackgroundScene = typeof BackgroundScene[keyof typeof BackgroundScene]
