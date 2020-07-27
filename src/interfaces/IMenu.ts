export interface IMenuItem {
  name: string
  description: string
  index: number
}

export interface IMenu {
  readonly items: readonly IMenuItem[]
  addItem(item: IMenuItem): void
  updateItem(
    item: IMenuItem,
    updater: (item: IMenuItem | undefined) => IMenuItem | undefined
  ): void
  removeItem(item: IMenuItem): void
}
