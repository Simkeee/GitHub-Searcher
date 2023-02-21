      $(document).ready(function() {
        $("#search-input").on("keypress", function(e) {
          if (e.keyCode === 13) {
            var searchTerm = $("#search-input").val();
            $.ajax({
              type: "GET",
              url: "https://api.github.com/search/users?q=" + searchTerm,
              success: function(response) {
                $("#results").empty();
                for (var i = 0; i < response.items.length; i++) {
                  var user = response.items[i];
                  $("#results").append(
                    "<div class='res1'><img src='" + user.avatar_url + "' alt='User avatar' />"+"<p class='user' data-username=''>" + user.login + "</p></div>"
                  );
                }
                $(".user").on("click", function() {
                  var username = $(this).data("username");
                  $("#repositories").empty();
                  $.ajax({
                    type: "GET",
                    url: "https://api.github.com/users/" + username + "/repos",
                    dataType:'JSON',
                    success: function(repos) {
                      for (var i = 0; i < repos.length; i++) {
                        var repo = repos[i];
                        var image = repo.owner.avatar_url;
                        var description = repo.description;
                        var name = repo.name;
                        var stars = repo.stargazers_count;
                        var languages = repo.language;
                        $("#repositories").append(
                          "<div class='repo'>" + "<img src='" + image + "' alt='Repository image' />" +"<p>" +name +"</p>" +"<p>" +description +"</p>" +
                            "<p>Stars: " + stars +"</p>" +"<p>Language: " +languages +"</p>" +"</div>"
                        );
                      }
                    }
                  });
                });
              }
            });
          }
        });
      });