  // grab input field control
  let inputField = $("#location");

  // declare function to validate US zip Code
  // returns T or F
  function isValidUSZip(inputLocation) {
    console.log(/^\d{5}(-\d{4})?$/.test(inputLocation));
     return /^\d{5}(-\d{4})?$/.test(inputLocation);
  }

  // When enter key is pressed inside input field:
  $(inputField).keypress(function(event) {

    // clears all innerHTML
    $(".cards").text("");
    $("h2").text("");

    // 13 = return keypress
    if(event.which === 13)
    {
      // check input has a valid zipcode
      // DOM will throw this error and this if statement is not executed:
      // {"error":{"code":1006,"message":"No matching location found."}
      if(isValidUSZip(inputField.val()) === false || inputField.val().length < 5)
      {
        alert("That is not a valid US Zip Code");
      }

      else {
        let inputLocation = inputField.val();

        let $main = $("<main/>", {});
        //
        $("header").append($main);

        $(document).ready( function() {

          let url = `http://api.apixu.com/v1/forecast.json?key=4227a014893b4e85b70214752190204&q=${inputLocation}&days=7`;

          $.ajax(
              {
                url: url,
                success: function(result){
                  let forecast = result.forecast.forecastday;

                  let $locationH2 = $("<h2/>", { id: "location-banner", text: "7-Day Forecast for " + result.location.name});

                  $("header").append($locationH2);

                  $.each (forecast, function(index, dayOfWeek) {

                    let $highLowh3 = $("<h3/>", { text: dayOfWeek.day.maxtemp_f.toFixed(0) + "º/" + dayOfWeek.day.maxtemp_f.toFixed(0) + "º" });
                    let $iconImg = $("<img/>", { src: "https:" + dayOfWeek.day.condition.icon });
                    let $dateh3 = $("<h3/>", {text: dayOfWeek.date });
                    let $article = $("<article/>", {class: "col-1"});

                    $article.append($dateh3).css( 'white-space', 'nowrap');
                    $article.append($iconImg);
                    $article.append($highLowh3);

                    $(".cards").append($article);
                    })
                }
            }); // end $.ajax

        });
      }
    }
  });
