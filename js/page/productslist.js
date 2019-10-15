var urlParams = new URLSearchParams(location.search);
let list =document.querySelector('.list-pro-color')
let vendors=[];
let sizes=['1:10','1:12'];
$(document).ready(function() {

    //let list=$("");
    console.log(list);
    const requestURL = '/search/products';
    console.log('making ajax request to:', requestURL);
    // From: http://learn.jquery.com/ajax/jquery-ajax-methods/
    // Using the core $.ajax() method since it's the most flexible.
    // ($.get() and $.getJSON() are nicer convenience functions)
    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: requestURL,
      type: 'GET',
      dataType : 'json', // this URL returns data in JSON format
      success: (data) => {
       console.log(vendors.length);
       // console.log('You received some data!', data);
        for(var i=0;i<data.length;i++)
        {   
           if( (sizes.length>0?findSizes(data[i]):true) && (vendors.length>0?findVendors(data[i]):true))
           {
             //ex. http://localhost:9000/productslist?page=1
           // var page =urlParams.get('page');
              list.innerHTML+=`${data[i].productName}|${data[i].productScale} <br>`;
           }
        }
      }
    });

    $("#submit").click(function(){
      // $.ajax({
      //   // all URLs are relative to http://localhost:3000/
      //   url: requestURL,
      //   type: 'GET',
      //   dataType : 'json', // this URL returns data in JSON format
      //   success: (data) => {
      //    console.log(vendors.length);
      //    // console.log('You received some data!', data);
      //     for(var i=0;i<data.length;i++)
      //     {   
      //        if( (sizes.length>0?findSizes(data[i]):true) && (vendors.length>0?findVendors(data[i]):true))
      //        {
              
      //           list.innerHTML+=`${data[i].productName}|${data[i].productScale} <br>`;
      //        }
      //     }
      //   }
      // });
    });

    
});

function findSizes(data){
  let find=false;
  sizes.forEach(size => {
    if(data.productScale==size)
    {
      console.log(`${data.productScale}|${size}`);
      find=true;
  
    }
    
  });
  return find;
}

function findVendors(data){
  let find=false;
  vendors.forEach(vendor => {
    if(data.productVendor==vendor)
    {
        find=true;
        
    }
  });
  return find;
}