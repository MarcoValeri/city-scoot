(function () {

    const firebaseConfig = {
        
      };

      firebase.initializeApp(firebaseConfig);

      const guideRef = firebase.database().ref("guides");

      document.getElementById("form-guides").addEventListener("submit", handleForm);

      function handleForm(e) {
          e.preventDefault();
          const formGuides = document.getElementById("form-guides");
          const guideID = document.getElementById("inputID").value;
          const guideName = document.getElementById("inputName").value;
          const guideLastName = document.getElementById("inputLastName").value;
          const guideAge = document.getElementById("inputAge").value;
          const guideOccupation = document.getElementById("inputOccupation").value;
          const guideBlueBadge = document.getElementById("inputBlueBadge").value;
          const guideTour = document.getElementById("inputTour").value;
          const guideImg = document.getElementById("inputImg").value;
          saveGuide(guideID, guideName, guideLastName, guideAge, guideOccupation, guideBlueBadge, guideTour, guideImg);
          formGuides.reset();
          document.getElementById("form-msg").style.display = "block";
      }

      function saveGuide(guideID, guideName, guideLastName, guideAge, guideOccupation, guideBlueBadge, guideTour, guideImg) {
          let newGuideRef = guideRef.push();
          newGuideRef.set({
            guide_ID: guideID,
            guide_name: guideName,
            guide_last_name: guideLastName,
            guide_age: guideAge,
            guide_occupation: guideOccupation,
            guide_blue_badge: guideBlueBadge,
            guide_tour: guideTour,
            guide_img: guideImg
          });
      }

} ());

