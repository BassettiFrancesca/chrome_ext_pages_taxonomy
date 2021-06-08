const showDescription = document.getElementById('show-insert-description');
const form = document.getElementById('insert-description');
const msg = document.getElementById('msg');
const description = document.getElementById('description-id');
const categories = document.getElementById('categories');
const msgFs = document.getElementById('msg-categories');

const showCategory = document.getElementById('show-insert-category');
const formCategory = document.getElementById('insert-category');
const msgCategory = document.getElementById('msg-c');
const category = document.getElementById('category-id');
const categoriesC = document.getElementById('categories-c');
const msgCC = document.getElementById('msg-categories-c');

const showCategoriesSaved = document.getElementById('show-categories');
const categoryList = document.getElementById('category-list');

const im = document.getElementById('import');
const e = document.getElementById('export');

const instr = document.getElementById('instructions');
const instrT = document.getElementById('instructions-text');

const showImpExp = document.getElementById('show-imp-exp');
const impExp = document.getElementById('imp-exp');
const succImp = document.getElementById('import-success');
const msgImp = document.getElementById('msg-import');
const succExp = document.getElementById('export-success');
const delSuccImp = document.getElementById('del-is');
const delSuccExp = document.getElementById('del-es');

let listOfCategories = [];
let listOfCN = [];
let listOfDN = [];
let tabUrl;
let categorySelected;
let addDescriptionShow = false;
let addCategoryShow = false;
let areCategoriesShown = false;
let areIEShown = false;
let instrOpen = false;

function emptyLists() {
    if (categories.innerHTML != '') {
        categories.innerHTML = '';
    }
    if (categoriesC.innerHTML != '') {
        categoriesC.innerHTML = '';
    }
    if (categoryList.innerHTML != '') {
        categoryList.innerHTML = '';
    }
}

showDescription.addEventListener('click', showDescriptions);

function showDescriptions() {
    msg.innerHTML = '';
    msgFs.innerHTML = '';
    msgCategory.innerHTML = '';
    msgCC.innerHTML = '';
    categorySelected = undefined;
    if (addDescriptionShow == false) {
        showDescription.setAttribute('class', 'open');
        showCategoriesSaved.setAttribute('class', 'buttons');
        showCategory.setAttribute('class', 'buttons');
        showImpExp.setAttribute('class', 'buttons');
        emptyLists();
        categoryList.style.display = 'none';
        formCategory.style.display = 'none';
        impExp.style.display = 'none';
        addDescriptionShow = true;
        addCategoryShow = false;
        areCategoriesShown = false;
        areIEShown = false;
        form.style.display = 'block';
        if (localStorage.getItem("categoryList") != null && localStorage.getItem("categoryList") != '[]') {
            listOfCategories = JSON.parse(localStorage.getItem("categoryList"));
            showSelectListofCategories(listOfCategories, categories);
        } else {
            let li = document.createElement('li');
            li.setAttribute('class', 'no-categories');
            li.appendChild(document.createTextNode('Click "Add Category" to add a category'));
            categories.appendChild(li);
        }
    } else {
        showDescription.setAttribute('class', 'buttons');
        addDescriptionShow = false;
        form.style.display = 'none';
    }
}

showCategory.addEventListener('click', showCategories);

function showCategories() {
    msg.innerHTML = '';
    msgFs.innerHTML = '';
    msgCategory.innerHTML = '';
    msgCC.innerHTML = '';
    categorySelected = undefined;
    if (addCategoryShow == false) {
        showCategory.setAttribute('class', 'open');
        showCategoriesSaved.setAttribute('class', 'buttons');
        showDescription.setAttribute('class', 'buttons');
        showImpExp.setAttribute('class', 'buttons');
        emptyLists();
        form.style.display = 'none';
        categoryList.style.display = 'none';
        impExp.style.display = 'none';
        addCategoryShow = true;
        addDescriptionShow = false;
        areCategoriesShown = false;
        areIEShown = false;
        formCategory.style.display = 'block';
        if (localStorage.getItem("categoryList") != null && localStorage.getItem("categoryList") != '[]') {
            listOfCategories = JSON.parse(localStorage.getItem("categoryList"));
            showSelectListofCategories(listOfCategories, categoriesC);
        } else {
            let li = document.createElement('li');
            li.setAttribute('class', 'no-categories');
            li.appendChild(document.createTextNode('Write the category and click "Submit"'));
            categoriesC.appendChild(li);
        }
    } else {
        showCategory.setAttribute('class', 'buttons');
        addCategoryShow = false;
        formCategory.style.display = 'none';
    }
}

showCategoriesSaved.addEventListener('click', showSavedCategories);

function showSavedCategories() {
    msg.innerHTML = '';
    msgFs.innerHTML = '';
    msgCategory.innerHTML = '';
    msgCC.innerHTML = '';
    if (areCategoriesShown == false) {
        showCategoriesSaved.setAttribute('class', 'open');
        showCategory.setAttribute('class', 'buttons');
        showDescription.setAttribute('class', 'buttons');
        showImpExp.setAttribute('class', 'buttons');
        emptyLists();
        form.style.display = 'none';
        formCategory.style.display = 'none';
        impExp.style.display = 'none';
        areCategoriesShown = true;
        addCategoryShow = false;
        addDescriptionShow = false;
        areIEShown = false;
        categoryList.style.display = 'block';
        if (localStorage.getItem("categoryList") != null && localStorage.getItem("categoryList") != '[]') {
            listOfCategories = JSON.parse(localStorage.getItem("categoryList"));
            showListofCategories(listOfCategories, categoryList);
        } else {
            let li = document.createElement('li');
            li.setAttribute('class', 'no-categories');
            li.appendChild(document.createTextNode('Click "Add Category" to add a category'));
            categoryList.appendChild(li);
        }
    } else {
        showCategoriesSaved.setAttribute('class', 'buttons');
        areCategoriesShown = false;
        categoryList.style.display = 'none';
    }
}


function showSelectListofCategories(listOfCt, fds) {
    fds.innerHTML = '';
    for (let categoryObj of listOfCt) {
        let c = {
            descriptions : [],
            categories : [],
            name : categoryObj.name,
            open : false,
            selectCategory : function() {
                msgFs.innerHTML = '';
                msgCategory.innerHTML = '';
                msgCC.innerHTML = '';

                if (categorySelected == c) {
                    categorySelected = undefined;
                    document.getElementById(`${c.name}container`).setAttribute('class', 'container-sel not-selected');
                } else {
                    if (categorySelected) {
                        document.getElementById(`${categorySelected.name}container`).setAttribute('class', 'container-sel not-selected');
                    }
                    categorySelected = c;
                    document.getElementById(`${c.name}container`).setAttribute('class', 'container-sel selected');
                }
    
                if (c.open == false){
                    document.getElementById(`${c.name}icon`).setAttribute('class', 'material-icons-outlined');
                    c.open = true;
                    document.getElementById(`${c.name}f`).style.display = 'block';
                    if (c.categories.length > 0) {
                        showSelectListofCategories(c.categories, document.getElementById(`${c.name}f`));
                    }
                } else {
                    document.getElementById(`${c.name}icon`).setAttribute('class', 'material-icons');
                    document.getElementById(`${c.name}f`).style.display = 'none';
                    c.open = false;
                }
            }
        }

        if (categoryObj.categories.length > 0) {
            for (let fd of categoryObj.categories) {
                c.categories.push(fd);
            } 
        }

        const li = document.createElement('li');
        const i = document.createElement('span');
        const a = document.createElement('a');
        const container = document.createElement('p');
        container.setAttribute('id', `${c.name}container`);
        a.style.display = 'block';
        a.setAttribute('id', `${c.name}category`);
        const ul = document.createElement('ul');

        container.setAttribute('class', 'container-sel not-selected');

        i.setAttribute('class', 'material-icons');
        i.innerHTML = 'category';
        i.style.fontSize = '20px';
        i.setAttribute('id', `${c.name}icon`);

        ul.setAttribute('id', `${c.name}f`);

        container.addEventListener('click', c.selectCategory);
        a.appendChild(document.createTextNode(`${c.name}`));

        container.appendChild(i);
        container.appendChild(a);
        li.appendChild(container);
        li.appendChild(ul);
    
        fds.appendChild(li);

    }
}

function showListofCategories(listOfCt, ct) {
    ct.innerHTML = '';
    for (let categoryObj of listOfCt) {
        let c = {
            descriptions : [],
            categories : [],
            name : categoryObj.name,
            open : false,
            openCategory : function() {
                if (c.open == false){
                    document.getElementById(`${c.name}icon`).setAttribute('class', 'material-icons-outlined');
                    document.getElementById(`${c.name}d`).style.display = 'none';
                    document.getElementById(`${c.name}m`).style.display = 'none';
                    document.getElementById(`${c.name}f`).innerHTML = '';
                    document.getElementById(`${c.name}b`).innerHTML = '';
                    document.getElementById(`${c.name}f`).style.display = 'block';
                    document.getElementById(`${c.name}b`).style.display = 'block';   
                    if (c.categories.length > 0) {
                        showListofCategories(c.categories, document.getElementById(`${c.name}f`));
                    }
                    if (c.descriptions.length > 0) {
                        showListofDescriptions(c);
                    }
                    c.open = true;
                } else {
                    document.getElementById(`${c.name}icon`).setAttribute('class', 'material-icons');
                    document.getElementById(`${c.name}f`).style.display = 'none';
                    document.getElementById(`${c.name}b`).style.display = 'none';
                    document.getElementById(`${c.name}d`).style.display = 'none';
                    document.getElementById(`${c.name}m`).style.display = 'none';
                    c.open = false;
                }
            },
            checkDelete : function() {
                let checks = document.getElementsByClassName('check');
                for (let c of checks) {
                    c.style.display = 'none';
                }
                document.getElementById(`${c.name}d`).style.display = 'block';
                document.getElementById(`${c.name}m`).style.display = 'none';
            },
            dontDelete : function() {
                document.getElementById(`${c.name}d`).style.display = 'none';
            },
            deleteF : function() {
                document.getElementById(`${c.name}d`).style.display = 'none';
                listOfCN = JSON.parse(localStorage.getItem("categoryNames"));
                let i = listOfCN.indexOf(c.name);
                listOfCN.splice(i, 1);
                let listOfFNSerialized = JSON.stringify(listOfCN);
                localStorage.setItem("categoryNames", listOfFNSerialized);
                if (localStorage.getItem("descriptionNames") != null) {
                    listOfDN = JSON.parse(localStorage.getItem("descriptionNames"));
                }
                deleteAllNames(c);
                let foundfd = false;
                listOfCategories = JSON.parse(localStorage.getItem("categoryList"));
                delCategory(c, listOfCategories, foundfd);
                let categoryListSerialized = JSON.stringify(listOfCategories);
                localStorage.setItem("categoryList", categoryListSerialized);
                document.getElementById(`${c.name}fd`).innerHTML = '';
                document.getElementById(`${c.name}fd`).remove();
                deleteItem(c.name, listOfCt);
            },
            modifyName : function() {
                msgFIn.innerHTML = '';
                let mod = document.getElementsByClassName('modify');
                for (let m of mod) {
                    m.style.display = 'none';
                }
                document.getElementById(`${c.name}m`).style.display = 'block';
                document.getElementById(`${c.name}d`).style.display = 'none';
            },
            undoModifyName : function() {
                document.getElementById(`${c.name}name-id`).value = '';
                document.getElementById(`${c.name}m`).style.display = 'none';
            },
            doModifyName : function() {
                msgFIn.innerHTML = '';

                listOfCN = JSON.parse(localStorage.getItem("categoryNames"));
            
                let sameName;
            
                if (document.getElementById(`${c.name}name-id`).value === '') {
            
                    msgFIn.innerHTML = 'Please enter your category';
            
                } else {
            
                    sameName = false;
                        
                    if (listOfCN.length > 0) {
                        for (let fn of listOfCN) {
                            if (fn == document.getElementById(`${c.name}name-id`).value) {
                                msgFIn.innerHTML = 'This category already exists, please enter a different category';
                                sameName = true;
                            }
                        }
                    }
            
                }
            
                if (sameName === false) {
            
                    msgFIn.innerHTML = '';
            
                    listOfCategories = JSON.parse(localStorage.getItem("categoryList"));
            
                    let found = false;
                
                    found = saveModCategory(document.getElementById(`${c.name}name-id`).value, c, listOfCategories, found);
            
                    if (found == false) {
                        msgFIn.innerHTML = 'Error modifying the category';
                        document.getElementById(`${c.name}name-id`).value = '';
                    } else {
                        let i = listOfCN.indexOf(c.name);
                        listOfCN.splice(i, 1);
                
                        listOfCN.push(document.getElementById(`${c.name}name-id`).value);
                
                        let listOfFNSerialized = JSON.stringify(listOfCN);
                    
                        localStorage.setItem("categoryNames", listOfFNSerialized);

                        let listOfCategoriesSerialized = JSON.stringify(listOfCategories);
            
                        localStorage.setItem("categoryList", listOfCategoriesSerialized);

                        document.getElementById(`${c.name}name-id`).value = '';
                
                        showListofCategories(listOfCategories, categoryList);
                    }
                    
                }
            }
        }

        if (categoryObj.descriptions.length > 0) {
            for (let ur of categoryObj.descriptions) {
                c.descriptions.push(ur);
            }
        }

        if (categoryObj.categories.length > 0) {
            for (let fd of categoryObj.categories) {
                c.categories.push(fd);
            }
        }

        const li = document.createElement('li');
        li.setAttribute('id', `${c.name}fd`);
        const i = document.createElement('span');
        const a = document.createElement('a');
        const df = document.createElement('span');
        const ulf = document.createElement('ul');
        const ulb = document.createElement('ul');
        const check = document.createElement('p');
        const checkCont = document.createElement('p');
        const yn = document.createElement('p');
        const yes = document.createElement('a');
        const no = document.createElement('a');
        const containerSx = document.createElement('p');
        const containerDx = document.createElement('p');
        const container = document.createElement('p');
        const modify = document.createElement('span');
        const modifyInput = document.createElement('div');
        const label = document.createElement('label');
        const nameInput = document.createElement('input');
        const submit = document.createElement('a');
        const cancel = document.createElement('a');
        const buttons = document.createElement('p');
        const msgFIn = document.createElement('p');

        container.setAttribute('class', 'container');
        containerSx.setAttribute('class', 'int-container');
        containerDx.setAttribute('class', 'int-container-dx');

        i.setAttribute('class', 'material-icons');
        i.innerHTML = 'category';
        i.style.fontSize = '20px';
        i.setAttribute('id', `${c.name}icon`);

        ulf.setAttribute('id', `${c.name}f`);
        ulb.setAttribute('id', `${c.name}b`);
        ulf.setAttribute('display', 'block');
        ulb.setAttribute('display', 'block');

        modify.setAttribute('class', 'material-icons-outlined');
        modify.innerHTML = 'edit';
        modify.style.fontSize = '20px';
        modify.addEventListener('click', c.modifyName);
        label.setAttribute('for', `${c.name}name-id`);
        label.setAttribute('class', 'labels');
        label.innerHTML = 'Insert the new name:';
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('id', `${c.name}name-id`);
        nameInput.setAttribute('placeholder', 'Category');
        nameInput.setAttribute('class', 'text-input');
        submit.setAttribute('class', 'buttons');
        submit.innerHTML = 'Submit';
        submit.addEventListener('click', c.doModifyName);
        cancel.setAttribute('class', 'buttons');
        cancel.innerHTML = 'Cancel';
        cancel.addEventListener('click', c.undoModifyName);
        msgFIn.setAttribute('class', 'msg');
        buttons.appendChild(cancel);
        buttons.appendChild(submit);
        modifyInput.appendChild(label);
        modifyInput.appendChild(nameInput);
        modifyInput.appendChild(msgFIn);
        modifyInput.appendChild(buttons);
        modifyInput.setAttribute('id', `${c.name}m`);
        modifyInput.setAttribute('class', 'modify');
        modifyInput.style.display = 'none';

        containerSx.addEventListener('click', c.openCategory);
        a.appendChild(document.createTextNode(`${c.name}`));
        a.style.display = 'block';

        df.addEventListener('click', c.checkDelete);
        df.setAttribute('class', 'material-icons delete');
        df.innerHTML = 'clear';
        df.style.fontSize = '20px';

        checkCont.appendChild(document.createTextNode(`Do you want to delete "${c.name}"?`));
        yes.appendChild(document.createTextNode('Yes'));
        yes.addEventListener('click', c.deleteF);
        no.appendChild(document.createTextNode('No'));
        no.addEventListener('click', c.dontDelete);
        yn.appendChild(yes);
        yn.appendChild(no);
        check.appendChild(checkCont);
        check.appendChild(yn);
        check.setAttribute('class', 'check');
        check.setAttribute('id', `${c.name}d`);
        yes.setAttribute('class', 'yn');
        no.setAttribute('class', 'yn');
        check.style.display = 'none';

        containerSx.appendChild(i);
        containerSx.appendChild(a);
        containerDx.appendChild(modify);
        containerDx.appendChild(df);
        container.appendChild(containerSx);
        container.appendChild(containerDx);
        li.appendChild(container);
        li.appendChild(check);
        li.appendChild(modifyInput);
        li.appendChild(ulf);
        li.appendChild(ulb);

        ct.appendChild(li); 

    }
}

function showListofDescriptions(c) {
    for (let d of c.descriptions) {
        let descriptionUrl = {
            url : d.url,
            description : d.description,
            openUrl : function() {
                chrome.tabs.create({
                    url: d.url
                })
            },
            checkDelete : function() {
                let checks = document.getElementsByClassName('check');
                for (let c of checks) {
                    c.style.display = 'none';
                }
                document.getElementById(`${descriptionUrl.description}db`).style.display = 'block';
                document.getElementById(`${descriptionUrl.description}mb`).style.display = 'none';
            },
            dontDelete : function() {
                document.getElementById(`${descriptionUrl.description}db`).style.display = 'none';
            },
            deleteB : function() {
                document.getElementById(`${descriptionUrl.description}db`).style.display = 'none';
                listOfDN = JSON.parse(localStorage.getItem("descriptionNames"));
                let i = listOfDN.indexOf(descriptionUrl.description);
                listOfDN.splice(i, 1);
                let listOfBNSerialized = JSON.stringify(listOfDN);
                localStorage.setItem("descriptionNames", listOfBNSerialized);
                let foundbd = false;
                listOfCategories = JSON.parse(localStorage.getItem("categoryList"));
                delDescription(c, descriptionUrl, listOfCategories, foundbd);
                let categoryListSerialized = JSON.stringify(listOfCategories);
                localStorage.setItem("categoryList", categoryListSerialized);
                document.getElementById(`${descriptionUrl.description}bm`).remove();
                deleteItem(descriptionUrl.description, c.descriptions);
            },
            modifyName : function() {
                msgFInb.innerHTML = '';
                let mod = document.getElementsByClassName('modify');
                for (let m of mod) {
                    m.style.display = 'none';
                }
                document.getElementById(`${descriptionUrl.description}mb`).style.display = 'block';
                document.getElementById(`${descriptionUrl.description}db`).style.display = 'none';
            },
            undoModifyName : function() {
                document.getElementById(`${descriptionUrl.description}name-id-b`).value = '';
                document.getElementById(`${descriptionUrl.description}mb`).style.display = 'none';
            },
            doModifyName : function() {

                msgFInb.innerHTML = '';
    
                listOfDN = JSON.parse(localStorage.getItem("descriptionNames"));

                let sameName;
            
                if (document.getElementById(`${descriptionUrl.description}name-id-b`).value === '') {
            
                    msgFInb.innerHTML = 'Please enter your description';
            
                } else {
            
                    sameName = false;
                        
                    if (listOfDN.length > 0) {
                        for (let n of listOfDN) {
                            if (n == document.getElementById(`${descriptionUrl.description}name-id-b`).value) {
                                msgFInb.innerHTML = 'This description already exists, please enter a different description';
                                sameName = true;
                            }
                        }
                    }
            
                    if (sameName === false) {
                        
                        msgFInb.innerHTML = '';
            
                        listOfCategories = JSON.parse(localStorage.getItem("categoryList"));
            
                        let found = false;
            
                        found = saveModDescription(document.getElementById(`${descriptionUrl.description}name-id-b`).value, c, descriptionUrl, listOfCategories, found);
            
                        if (found == false) {
                            msgFInb.innerHTML = 'Error modifying the description';
                            document.getElementById(`${descriptionUrl.description}name-id-b`).value = '';
                        } else {
                            let i = listOfDN.indexOf(descriptionUrl.description);
                            listOfDN.splice(i, 1);
            
                            listOfDN.push(document.getElementById(`${descriptionUrl.description}name-id-b`).value);
            
                            let listOfBNSerialized = JSON.stringify(listOfDN);
                
                            localStorage.setItem("descriptionNames", listOfBNSerialized);

                            let categoryListSerialized = JSON.stringify(listOfCategories);
            
                            localStorage.setItem("categoryList", categoryListSerialized);
                
                            document.getElementById(`${descriptionUrl.description}name-id-b`).value = '';
                
                            showListofCategories(listOfCategories, categoryList);
                        }
            
                    }

                }
            
            }
                
        }

        let lib = document.createElement('li');
        lib.setAttribute('id', `${descriptionUrl.description}bm`);
        let ab = document.createElement('a');
        let i = document.createElement('span');
        let db = document.createElement('span');
        let check = document.createElement('p');
        let yes = document.createElement('a');
        let no = document.createElement('a');
        let yn = document.createElement('p');
        let checkCont = document.createElement('p');
        let containerSx = document.createElement('p');
        let containerDx = document.createElement('p');
        let container = document.createElement('p');
        let modify = document.createElement('span');
        let modifyInput = document.createElement('div');
        let label = document.createElement('label');
        let nameInput = document.createElement('input');
        let submit = document.createElement('a');
        let cancel = document.createElement('a');
        let buttons = document.createElement('p');
        let msgFInb = document.createElement('p');

        container.setAttribute('class', 'container');
        containerSx.setAttribute('class', 'int-container');
        containerDx.setAttribute('class', 'int-container-dx');

        i.setAttribute('class', 'material-icons-outlined');
        i.innerHTML = 'description';
        i.style.fontSize = '20px';

        modify.setAttribute('class', 'material-icons-outlined');
        modify.innerHTML = 'edit';
        modify.style.fontSize = '20px';
        modify.addEventListener('click', descriptionUrl.modifyName);
        label.setAttribute('for', `${descriptionUrl.description}name-id-b`);
        label.setAttribute('class', 'labels');
        label.innerHTML = 'Insert the new description:';
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('id', `${descriptionUrl.description}name-id-b`);
        nameInput.setAttribute('placeholder', 'Description');
        nameInput.setAttribute('class', 'text-input');
        submit.setAttribute('class', 'buttons');
        submit.innerHTML = 'Submit';
        submit.addEventListener('click', descriptionUrl.doModifyName);
        cancel.setAttribute('class', 'buttons');
        cancel.innerHTML = 'Cancel';
        cancel.addEventListener('click', descriptionUrl.undoModifyName);
        msgFInb.setAttribute('class', 'msg');
        buttons.appendChild(cancel);
        buttons.appendChild(submit);
        modifyInput.appendChild(label);
        modifyInput.appendChild(nameInput);
        modifyInput.appendChild(msgFInb);
        modifyInput.appendChild(buttons);
        modifyInput.setAttribute('id', `${descriptionUrl.description}mb`);
        modifyInput.setAttribute('class', 'modify');
        modifyInput.style.display = 'none';

        containerSx.addEventListener('click', descriptionUrl.openUrl);
        ab.appendChild(document.createTextNode(`${descriptionUrl.description}`));
        ab.style.display = 'block';

        db.addEventListener('click', descriptionUrl.checkDelete);
        db.setAttribute('class', 'material-icons delete');
        db.innerHTML = 'clear';
        db.style.fontSize = '20px';

        checkCont.appendChild(document.createTextNode(`Do you want to delete "${descriptionUrl.description}"?`));
        yes.appendChild(document.createTextNode('Yes'));
        yes.addEventListener('click', descriptionUrl.deleteB);
        no.appendChild(document.createTextNode('No'));
        no.addEventListener('click', descriptionUrl.dontDelete);
        yn.appendChild(yes);
        yn.appendChild(no);
        check.appendChild(checkCont);
        check.appendChild(yn);
        check.setAttribute('class', 'check');
        check.setAttribute('id', `${descriptionUrl.description}db`);
        yes.setAttribute('class', 'yn');
        no.setAttribute('class', 'yn');
        check.style.display = 'none';

        containerSx.appendChild(i);
        containerSx.appendChild(ab);
        containerDx.appendChild(modify);
        containerDx.appendChild(db);
        container.appendChild(containerSx);
        container.appendChild(containerDx);
        lib.appendChild(container);
        lib.appendChild(check);
        lib.appendChild(modifyInput);

        document.getElementById(`${c.name}b`).appendChild(lib);
    }
}

formCategory.addEventListener('submit', onSubmitCategory);

function onSubmitCategory(e) {

    msgCC.innerHTML = '';

    if (localStorage.getItem("categoryNames") != null) {
        listOfCN = JSON.parse(localStorage.getItem("categoryNames"));
    }

    let sameName;

    e.preventDefault();

    if (category.value === '') {

        msgCategory.innerHTML = 'Please enter your category';

    } else {

        sameName = false;
            
        if (listOfCN.length > 0) {
            for (let f of listOfCN) {
                if (f == category.value) {
                    msgCategory.innerHTML = 'This category already exists, please enter a different category';
                    sameName = true;
                }
            }
        }

    }

    if (sameName === false) {

        msgCategory.innerHTML = '';

        let categoryObj = {
            descriptions : [],
            categories : [],
            name : category.value,
            open : false
        }

        if (localStorage.getItem("categoryList") != null && localStorage.getItem("categoryList") != '[]') {
            listOfCategories = JSON.parse(localStorage.getItem("categoryList"));
        }

        if (categorySelected == undefined) {

            listOfCategories.push(categoryObj);

            listOfCN.push(category.value);

            let listOfCNSerialized = JSON.stringify(listOfCN);
        
            localStorage.setItem("categoryNames", listOfCNSerialized);
            
            let listOfCategoriesSerialized = JSON.stringify(listOfCategories);

            localStorage.setItem("categoryList", listOfCategoriesSerialized);

        } else {

            let found = false;
    
            found = saveCategory(categorySelected, categoryObj, listOfCategories, found);

            console.log(found);

            if (found == false) {
                msgCC.innerHTML = 'Error saving the category';
            } else {
                listOfCN.push(category.value);

                let listOfCNSerialized = JSON.stringify(listOfCN);
            
                localStorage.setItem("categoryNames", listOfCNSerialized);

                let listOfCategoriesSerialized = JSON.stringify(listOfCategories);

                localStorage.setItem("categoryList", listOfCategoriesSerialized);
            }

            categorySelected = undefined;

        }

        category.value = '';

        showSelectListofCategories(listOfCategories, categoriesC);

    }
}

async function saveBM() {

    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);

    tabUrl = tab.url;

    if (localStorage.getItem("descriptionNames") != null) {
        listOfDN = JSON.parse(localStorage.getItem("descriptionNames"));
    }

    let sameName;

    if (categorySelected == undefined) {

        msgFs.innerHTML = 'Please select a category';

    } else {
        if (description.value === '') {

            msg.innerHTML = 'Please enter your description';

        } else {

            sameName = false;
            
            if (listOfDN.length > 0) {
                for (let n of listOfDN) {
                    if (n == description.value) {
                        msg.innerHTML = 'This description already exists, please enter a different description';
                        sameName = true;
                    }
                }
            }

        }

        if (sameName === false) {
            
            msg.innerHTML = '';
            msgFs.innerHTML = '';

            let descriptionUrl = {
                url : tabUrl,
                description : description.value
            }

            listOfCategories = JSON.parse(localStorage.getItem("categoryList"));

            let found = false;

            found = saveDescription(categorySelected, descriptionUrl, listOfCategories, found);

            if (found == false) {
                msgFs.innerHTML = 'Error saving the description';
            } else {
                msgFs.innerHTML = 'Description saved successfully';

                listOfDN.push(description.value);

                let listOfDNSerialized = JSON.stringify(listOfDN);
    
                localStorage.setItem("descriptionNames", listOfDNSerialized);

                let categoryListSerialized = JSON.stringify(listOfCategories);

                localStorage.setItem("categoryList", categoryListSerialized);    
            }

            description.value = '';

            document.getElementById(`${categorySelected.name}category`).setAttribute('class', 'not-selected');

            categorySelected = undefined;
            showSelectListofCategories(listOfCategories, categories);
        }

    }
}

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    saveBM();
}

function saveCategory(cs, co, list, found) {

    if (list.length > 0) {
        for (let c of list) {
            if (found == true) {
                break;
            }
            if (c.name == cs.name) {
                c.categories.push(co);
                found = true;
            } else {
                found = saveCategory(cs, co, c.categories, found);
            }
        }
    }

    return found;

}

function saveModCategory(name, co, list, found) {

    if (list.length > 0) {
        for (let c of list) {
            if (found == true) {
                break;
            }
            if (c.name == co.name) {
                c.name = name;
                found = true;
            } else {
                found = saveModCategory(name, co, c.categories, found);
            }
        }
    }

    return found;

}

function delCategory(co, list, foundct) {

    if (list.length > 0) {
        for (let c of list) {
            if (foundct == true) {
                break;
            }
            if (c.name == co.name) {
                deleteItem(co.name, list);
                foundct = true;
            } else {
                foundct = delCategory(co, c.categories, foundct);
            }
        }
    }

    return foundct;

}

function deleteItem(n, list) {

    let found = false;
    let i = 0;
    for (let j of list) {
        if (found == true) {
            break;
        }
        if (j.name == n) {
            list.splice(i, 1);
            found = true;
        }
        i++;
    }

}

function deleteAllNames(c) {
    if (c.categories.length > 0) {
        for (let i of c.categories) {
            let j = listOfCN.indexOf(i.name);
            listOfCN.splice(j, 1);
            deleteAllNames(i);
        }
        let listOfFNSerialized = JSON.stringify(listOfCN);
        localStorage.setItem("categoryNames", listOfFNSerialized);
    }
    if (c.descriptions.length > 0) {
        for (let k of c.descriptions) {
            let l = listOfDN.indexOf(k.name);
            listOfDN.splice(l, 1);
        }
        let listOfBNSerialized = JSON.stringify(listOfDN);
        localStorage.setItem("descriptionNames", listOfBNSerialized);
    }
}

function saveDescription(cs, ds, list, found) {

    if (list.length > 0) {
        for (let c of list) {
            if (found == true) {
                break;
            }
            if (c.name == cs.name) {
                c.descriptions.push(ds);
                found = true;
            } else {
                found = saveDescription(cs, ds, c.categories, found);
            }
        }
    }

    return found;

}

function saveModDescription(description, co, ds, list, found) {

    if (list.length > 0) {
        for (let c of list) {
            if (found == true) {
                break;
            }
            if (c.name == co.name) {
                for (let d of c.descriptions) {
                    if (d.description == ds.description) {
                        d.description = description;
                        found = true;
                    }
                }
            } else {
                found = saveModDescription(description, co, ds, c.categories, found);
            }
        }
    }

    return found;

}

function delDescription(cs, ds, list, foundbd) {

    if (list.length > 0) {
        for (let c of list) {
            if (foundbd == true) {
                break;
            }
            if (c.name == cs.name) {
                deleteDescription(ds.name, c.descriptions);
                foundbd = true;
            } else {
                foundbd = delDescription(cs, ds, c.categories, foundbd);
            }
        }
    }

    return foundbd;

}

function deleteDescription(d, list) {

    let found = false;
    let i = 0;
    for (let j of list) {
        if (found == true) {
            break;
        }
        if (j.description == d) {
            list.splice(i, 1);
            found = true;
        }
        i++;
    }

}

showImpExp.addEventListener('click', showImportExport);

function showImportExport() {
    msg.innerHTML = '';
    msgFs.innerHTML = '';
    msgCategory.innerHTML = '';
    msgCC.innerHTML = '';
    if (areIEShown == false) {
        showImpExp.setAttribute('class', 'open');
        showCategory.setAttribute('class', 'buttons');
        showDescription.setAttribute('class', 'buttons');
        showCategoriesSaved.setAttribute('class', 'buttons');
        emptyLists();
        addDescriptionShow = false;
        addCategoryShow = false;
        areCategoriesShown = false;
        areIEShown = true;
        form.style.display = 'none';
        formCategory.style.display = 'none';
        categoryList.style.display = 'none';
        impExp.style.display = 'block';
    } else {
        showImpExp.setAttribute('class', 'buttons');
        areIEShown = false;
        impExp.style.display = 'none';
    }
}

instr.addEventListener('click', openInstructions);

function openInstructions() {
    if (instrOpen == false) {
        instrOpen = true;
        instr.setAttribute('class', 'open');
        instrT.style.display = 'block';
    } else {
        instrOpen = false;
        instr.setAttribute('class', 'buttons');
        instrT.style.display = 'none';
    }
}

im.addEventListener('click', importJSON);

function readJSONFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function importJSON() {
    description.value = '';
    category.value = '';
    listOfCategories = [];
    listOfCN = [];
    listOfDN = [];
    readJSONFile("./pagestaxonomy.json", function(json){
        let data = JSON.parse(json);
        let listOfCategoriesSerialized = JSON.stringify(data);
        localStorage.setItem("categoryList", listOfCategoriesSerialized);
        listOfCategories = JSON.parse(localStorage.getItem("categoryList"));
        let valid = true;
        if (listOfCategories.length > 0) {
            valid = checkCategories(listOfCategories, valid);
        } else {
            valid = false;
        }
        let sameN = false;
        if (valid) {
            sameN = saveNames(listOfCategories, sameN);
            if (sameN == false){
                let listOfFNSerialized = JSON.stringify(listOfCN);
                localStorage.setItem("categoryNames", listOfFNSerialized);
                let listOfBNSerialized = JSON.stringify(listOfDN);
                localStorage.setItem("descriptionNames", listOfBNSerialized);
                succImp.style.display = 'block';
                msgImp.innerHTML = 'The taxonomy has been imported successfully';
            }
        } 
        if (valid == false || sameN) {
            succImp.style.display = 'block';
            msgImp.innerHTML = 'The taxonomy imported is not valid';
            listOfCategories = [];
            listOfCN = [];
            listOfDN = [];
            let listOfCategoriesSerialized = JSON.stringify(listOfCategories);
            localStorage.setItem("categoryList", listOfCategoriesSerialized);
            let listOfFNSerialized = JSON.stringify(listOfCN);
            localStorage.setItem("categoryNames", listOfFNSerialized);
            let listOfBNSerialized = JSON.stringify(listOfDN);
            localStorage.setItem("descriptionNames", listOfBNSerialized);
        }
    })
}

function saveNames(list, sameN) {
    if (list.length > 0) {
        for (let c of list) {
            if (listOfCN.length > 0) {
                for (let cn of listOfCN) {
                    if (cn == c.name) {
                        sameN = true;
                        break;
                    }
                }
            }
            if (sameN == false) {
                listOfCN.push(c.name);
                if (c.descriptions.length > 0) {
                    for (let d of c.descriptions) {
                        if (listOfDN.length > 0) {
                            for (let dn of listOfDN) {
                                if (dn == d.description) {
                                    sameN = true;
                                    break;
                                }
                            }
                        }
                        if (sameN == false) {
                            listOfDN.push(d.description);
                        } else {
                            break;
                        }
                    }
                }
            } else {
                break;
            }
            sameN = saveNames(c.categories, sameN); 
        }
    }
    return sameN;
}

e.addEventListener('click', export2json);

function export2json() {
    listOfCategories = JSON.parse(localStorage.getItem("categoryList"));
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(listOfCategories, null, 2)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "pagestaxonomy.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    succExp.style.display = 'block';
}

delSuccImp.addEventListener('click', deleteSuccImp);

function deleteSuccImp() {
    succImp.style.display = 'none';
}

delSuccExp.addEventListener('click', deleteSuccExp);

function deleteSuccExp() {
    succExp.style.display = 'none';
}

function checkDescriptions(dsc) {
    let valid = true;
    for (let d of dsc) {
        if (d.url == false || d.description == false || d.url == undefined || d.description == undefined) {
            valid = false;
            break;
        }
    }
    return valid;
}

function checkCategories(cts, valid) {
    for (let c of cts) {
        if ( !(Array.isArray(c.descriptions)) || c.name == false || !(Array.isArray(c.categories)) ||
            !(c.open === false || c.open === true) || c.name == undefined) {
            valid = false;
            break;
        }
        if (c.categories.length > 0) {
            valid = checkCategories(c.categories, valid);
        }
        if (c.descriptions.length > 0) {
            valid = checkDescriptions(c.descriptions, c.name);
        }
    }
    return valid;
}
