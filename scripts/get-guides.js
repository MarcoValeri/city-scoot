(function () {

    const firebaseConfig = {
        
    };

    firebase.initializeApp(firebaseConfig);

    const guideRef = firebase.database().ref().child("guides");
    guideRef
    .orderByChild("guide_last_name")
    .on("child_added", snap => {


        let guideID = snap.child("guide_ID").val();
        let guideName = snap.child("guide_name").val();
        let guideLastName = snap.child("guide_last_name").val();
        let guideAge = snap.child("guide_age").val();
        let guideOccupation = snap.child("guide_occupation").val();
        let guideBlueBadge = snap.child("guide_blue_badge").val();
        let guideTour = snap.child("guide_tour").val();
        let guideImg = snap.child("guide_img").val();

        if (guideBlueBadge !== 'No') {
            $("#guides-output").append(
            
                `
                <section class="col-xs-12 col-sm-6 col-lg-3">
                    <div class="card border-dark mb-3">
                        <img class="card-img-top" src="../images/${guideImg}" alt="Card image cap">
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
                </section>
                `
            );
        }

    });

}());