General approach - NgRx for state manegment, RxJS for data transfer and forms, Angular Material.

On App init service immitate data coming from back and after that data gets to NgRX store.
Home and Document components retrieve data from store and dispatch actions to change state.
After clicking name of Document user is redirected to Document page.
On Document page user can add annotation of two types - text and image.
User can use zoom.
Annotation before saving are stored on Document component level, after save they are set to Document object in store.
After Save user is redirected to Annotation page where table with Annotations data is displayed with Document. 



