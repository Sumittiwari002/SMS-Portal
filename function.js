function element(record){
    return document.querySelector(record);
}

function elements(record){
    return document.querySelectorAll(record);
}

function set(record, data){
    element(record).value = data;
}

function get(record){
    return element(record).value;
}

function lower(data){
    return data.toLowerCase();
}

function setValue(key, value){
    localStorage.setItem(key,value);
}
function getValue(key){
    return localStorage.getItem(key);
}

function parse(dataset){
    return JSON.parse(dataset);
}

function stringify(dataset){
    return JSON.stringify(dataset);
}

function create(el){
    return document.createElement(el)
}

function setMessage(record,value){
    element(record).innerHTML = value;
}
function empty(record){
    // console.log(record);
    
    let ans = record.filter(val=> val=="");
    // console.log(ans);
    
    return (ans.length>0)?true:false;
}
    // if(ans.length>0){
    //     return true;
    // }
    // else{
    //     return false;
    // }

    // function checkNumber(record){
    //     let ans = record.filter(val=>)
    // }
    function fetchDataUl(record, target, functionName){
        if(record!== null){
            let arr = parse(record);
            // console.log(arr);
        for(let val of arr){
            let liTag = create('li');
            // console.log(liTag);
            liTag.innerHTML = val;

            if(functionName == 'getMessage'){
                liTag.addEventListener('click', getMessage)
            }
            else if(functionName == 'getContact'){
                liTag.addEventListener('click', getContact);
            }
            element(target).append(liTag);
            
        }
            
        }
    }
    function getMessage(){
        // console.log('get Message tested');
        let libName = this.innerText.trim();
        console.log(libName);
        
        let result = getValue('messageDetails');

        if(result!== null){
            result = parse(result);
            // console.log(result);
            let valueMessage = result.filter(obj=>obj.libName==this.innerText);
            console.log(valueMessage);

            element('#all_message').innerHTML ='';
            for(let val of valueMessage){
                let liTag = create('li');
                //console.log(liTag);
                liTag.innerHTML = val.content;
                liTag.addEventListener('click', shareMessage)
                element("#all_message").append(liTag);
            }
            
        }
        
    }
    function shareMessage(ev){
        set("#formMessage", ev.target.innerText);
        // console.log("ev.target", ev.target.innerText);
    }

    function getContact(){
        let grpname = this.innerText.trim();
        console.log(grpname);
        
        // console.log('get contact tested', this.innerText);
        let result = getValue('contactDetails');
        // console.log(result);

        if(result !== null)
        {
            result = parse(result);
            console.log(result);
            let valueContact = result.filter(obj => obj.groupName==this.innerText);
            console.log(valueContact);

            element("#all_contact").innerHTML = '';
            for(let {name,mobile,email} of valueContact){
                let liTag = create('li');
                console.log(liTag);
                liTag.innerHTML = name;
                liTag.dataset.email = email;
                liTag.dataset.mobile = mobile;
                liTag.addEventListener('click', transferContactValue);
                element("#all_contact").append(liTag);
            }

        } 
    }
    function transferContactValue(ev){
        // console.log(ev.target.innerText);
        // console.log(ev.target.dataset);

        set("#formUserName", ev.target.innerText);
        set("#formUserEmail", ev.target.dataset.email);
        set("#formUserMobile", ev.target.dataset.mobile);
        
    }


    function fetchDataOption(record,target){
        if(record!==null){
            let arr = parse(record)
            // console.log(arr);

            for(let val of arr){
                let liTag = create('option');
                // console.log(liTag);
                liTag.innerHTML = val;
                liTag.value = val;
                element(target).append(liTag);
                
            }
            
        }
    }
    function checkNumber(record){
        let ans = record.filter(val=> isNaN(val));
        // console.log(ans);
        return (ans.length>0)?true:false;

        // if(ans.length>0){
        //     return true;
        // }
        // else{
        //     return false;
        // } 
    }
    function checkNegative(record){
        let ans = record.filter(val=> val<=0);
        // console.log(ans);
        return (ans.length>0)?true:false;
        
    }
    


export{
    element,
    elements,
    set,
    get,
    lower,
    setValue,
    getValue,
    parse,
    stringify, create, setMessage, empty,fetchDataUl,checkNumber,checkNegative, getMessage,fetchDataOption
}