# Library Challenge - TheOdinProject
This is my solution to the [Library Challenge](https://www.theodinproject.com/lessons/node-path-javascript-library) provided by [TheOdinProject](https://TheOdinProject.com).

## The challenge
The challenge was to create a libray which allows users to create books and to remove them. User should be able to add books using a form which enables them to type in the book's title, the author's name, the number of pages and whether it has been read. These books should then be displayed using cards.

## My Process
The library should be built using a factory function to create objects and add them to the myLibrary array. Users should also be able to change a books read status. Changing the status is achieved by adding an id attribute to every object to create a connection to the DOM. This feature should be implemented by using a prototype function for efficiency.

```js
function Book(title, author, pages, read) {
    if(!new.target) {
        throw Error("You have to use the 'new' operator to call the constructor.")
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.changeStatus = function() {
    this.read = !this.read;
}
```

## Assets
- [Poppins from Google Fonts](https://fonts.google.com/specimen/Poppins): A sans-serif typeface