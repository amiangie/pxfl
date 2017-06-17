/*
  Project: pxfl
  Author: angie
 */

  $( function() {
    var countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];
    
    $('.js-change-location').on('click', function(e){
      e.preventDefault();
      $('.js-autocomplete-appendto').toggleClass('is-hidden');
    });
    
    $('.js-autocomplete').autocomplete({
      source: countries,
      appendTo: ".js-autocomplete-appendto",
      minLength: 3,
      classes: {
        "ui-autocomplete": "c-autocomplete"
      }
    });
    
    $('.js-tab').click(function(){  
      $('.js-tab').attr('aria-selected', 'false');
      $(this).attr('aria-selected', 'true');
      $('.js-tabpanel').attr('aria-hidden', 'true');

      const tabPanelId = $(this).attr('aria-controls');
      const $tabPanel = $("#" + tabPanelId);  
      $tabPanel.attr('aria-hidden', 'false');
    });
    
    $('.js-sort-table').DataTable({
      searching: false,
      paging: false,
      info: false,
      autoWidth: false,
      ajax: "../assets/offers.json",
      columns: [
        { 
          "data": "seller", 
          "render": function ( data, type, full, meta ) {
            return data.name + '<span class="c-dtable__note">' + data.country + '</span>';
          },
          "orderable": false
        },
        { 
          "data": "payment", 
          "render": function ( data, type, full, meta ) {
            var content = data.method;
            if(data.note) {
              content += '<span class="c-dtable__note">' + data.note + '</span>';
            }
            if(data.tags) {
              content += `
                <div class="u-onlydesktop">
                  ${data.tags.map(
                      tag => `<span class="c-tag">${tag}</span>`
                  ).join('')}
                </div>
              `;
            }
            return content;
          },
          "orderable": false 
        },
        { 
          "data": "min_amount", 
          "className": "u-align--center" 
        },
        { 
          "data": "fee", 
          "className": "u-align--center"
        },
        { 
          "data": "reputation",
          "render": function ( data, type, full, meta ) {
            // If display or filter data is requested, format the reputation
            if ( type === 'display' || type === 'filter' ) {
              return `
                <span class="c-reputation">
                  <span class="c-reputation__pos">+${data.pos}</span>
                  /
                  <span class="c-reputation__neg">-${data.neg}</span>
                  <span class="c-reputation__reviews">
                    (${data.reviews} Reviews)
                  </span>
                </span>
              `;
            }
            // Otherwise the data type requested (`type`) is type detection or
            // sorting data, for which we want to use some integer to base
            // sorting on
            else {
              return parseInt(data.pos) - parseInt(data.neg);  
            }
          },
        },
        { 
          "data": "URL", 
          "render": function ( data, type, full, meta ) {
            return `<a href="${data}" class="c-button c-button--primary c-button--fixedsize">Buy</a>`;
          },
          "orderable": false 
        }
      ]
    });
    
  });