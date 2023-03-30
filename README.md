General approach - NgRx for state manegment, RxJS for data transfer and forms, Angular Material.

On App init service immitate data coming from back and after that data gets to NgRX store.
Home and Document components retrieve data from store and dispatch actions to change state.
Anotation before saving are stored on Document component level, after save they are set to Document obgect in store.
