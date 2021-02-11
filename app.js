// info Controller
var infoController = (function () {
  // private
  var Info = function (id, name, surname, address) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.address = address;
  };
  var data = {
    infos: [],
    //selectedInfo=null
  }

  // public
  return {
    getInfo: function () {
      return data.infos;
    },
    getData: function () {
      return data;
    },
    addInfo: function (name, surname,address) {
      var id;

      if (data.infos.length > 0) {
          id = data.infos[data.infos.length - 1].id + 1;
      } else {
          id = 0;
      }

      var newInfo = new Info(id, name, surname, address);
      data.infos.push(newInfo);
      return newInfo;
  }  
  }
})();
//   console.log(infoController.getInfo());
//   console.log(infoController.getData());

// UI Controller
var UIController = (function () {
  var Selectors = {
    infoList: "#item-list",
    addButton: '.addBtn',
    openButton: '.openBtn',
    infoName: '#infoName',
    infoSurname: '#infoSurname',
    infoAdress: '#infoAdress',
    infoCard: '#infoCard'
  };

  return {
    createInfoList: function (infos) {
      var html = "";

      infos.forEach((inf) => {
        html += `
              <tr>
                 <td>${inf.id}</td>
                 <td>${inf.name}</td>
                 <td>${inf.surname} $</td>
                 <td>${inf.address}</td>
              </tr>   
            `;
      });

      document.querySelector(Selectors.infoList).innerHTML = html;
    },
    getSelectors: function () {
      return Selectors;
    },
    addInfo: function (inf) {

      document.querySelector(Selectors.infoCard).style.display='block';
      var item = `            
      <tr>
      <td>${inf.id}</td>
      <td>${inf.name}</td>
      <td>${inf.surname}</td>
      <td>${inf.address}</td>
      </tr>               
      `;

      document.querySelector(Selectors.infoList).innerHTML += item;
  },
  clearInputs: function () {
      document.querySelector(Selectors.infoName).value = '';
      document.querySelector(Selectors.infoSurname).value = '';
      document.querySelector(Selectors.infoAdress).value = '';
  },
  hideCard: function () {
      document.querySelector(Selectors.infoCard).style.display = 'none';
  }
}
})();


// App Controller
  var App = (function(infoCtrl,UICtrl){
      
    var UISelectors = UIController.getSelectors();

    // Load Event Listeners
    var loadEventListeners = function () {

        // add info event
        document.querySelector(UISelectors.addButton).addEventListener('click', infoAddSubmit);

        //openModal
        document.querySelector(UISelectors.openButton).addEventListener('click', openModal);

    }


    var infoAddSubmit = function (e) {

        var infoName = document.querySelector(UISelectors.infoName).value;
        var infoSurname = document.querySelector(UISelectors.infoSurname).value;
        var infoAdress=document.querySelector(UISelectors.infoAdress).value;

        if (infoName !== '' && infoSurname !== '' && infoAdress !== '') {
            // Add info
            var newInfo = infoCtrl.addInfo(infoName, infoSurname, infoAdress);

            // add item to list
            UIController.addInfo(newInfo);

            // clear inputs
            UIController.clearInputs();

        }

        console.log(infoName, infoSurname, infoAdress);

        e.preventDefault();
    }
  
    return {
        init: function(){
            console.log('starting app...');
            const infos = infoCtrl.getInfo();           

            if (infos.length > 0) {
                UICtrl.hideCard();
            } else {
                UICtrl.createInfoList(infos);
            }

            // load event listeners
            loadEventListeners()
            
  
        }
    }
  
  
  })(infoController,UIController);
  
  App.init();


