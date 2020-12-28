(function () {

    const firebaseConfig = {
        
    };

    firebase.initializeApp(firebaseConfig);

    const guideRef = firebase.database().ref().child("guides");
    guideRef.on("child_added", snap => {

        let guideID = snap.child("guideID").val();
        let guideName = snap.child("guideName").val();
        let guideLastName = snap.child("guideLastName").val();
        let guideAge = snap.child("guideAge").val();
        let guideOccupation = snap.child("guideOccupation").val();
        let guideBlueBadge = snap.child("guideBlueBadge").val();
        let guideTour = snap.child("guideTour").val();
        let guideImg = snap.child("guideImg").val();

        $("#guides-output").append(
            `
            <div class="card border-dark mb-3">
                <img class="card-img-top" src="../images/guide-placeholder-image.jpg" alt="Card image cap">
                <div class="card-body text-info">
                    <h5 class="card-title">Guide ${guideID}</h5>
                    <p class="card-text">
                        - Name: ${guideName} ${guideLastName}<br>
                        - Age: ${guideAge}<br>
                        - Tours: ${guideTour}<br>
                        - Occupation: ${guideOccupation}<br>
                        - Blue Badge: ${guideBlueBadge}<br>
                    </p>
                </div>
            </div>
            `
        );

    });

}());