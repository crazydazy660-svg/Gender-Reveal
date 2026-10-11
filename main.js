/**
 * This file controls the page logic
 *
 * depends on jQuery>=1.7
 */

(function() {
    /**
     * Returns true if this browser supports canvas
     *
     * From http://diveintohtml5.info/
     */

    var color1 = '#ff95c8';
    var color2 = '#5194f8';
    var color3 ='#969696';
    // Green theme colors for Prank
    var colorPrank = '#4CAF50';      // Vibrant Green background
    var colortxtPrank = '#1B5E20';   // Dark Green text

    var colortxt1 = '#F860AA';
    var colortxt2= '#7FB1ED';
    var colortxt3= '#000000';
    
    // Select the background color (Green for Prank)
    var color = colorPrank;
    // Select the text color (Dark Green)
    var colortxt = colortxtPrank;
    
    var gendertext1 = "It is a Girl!";
    var gendertext2 = "It is a Boy!";
    var gendertext3 = "It's a Prank!";
    
    // Select the reveal text
    var gendertext = gendertext3;
    
    var surname;
    var soundHandle = new Audio();
    var triggered=false;
    var nosound=true;
    var params = new URLSearchParams(window.location.search.slice(1));
    var pct1=0, pct2=0, pct3=0, pct4=0, pct5=0, pct6 = 0;
    
    function supportsCanvas() {
        return !!document.createElement('canvas').getContext;
    };
    
    /**
     * Handle scratch event on a scratcher
     */
    function checkpct() {
        if (!triggered) {
            if (pct3>15&& pct4>15 && pct5>15) {
                if(CrispyToast.toasts.length!=0){
                    CrispyToast.clearall();
                }
                $('#boy').text(gendertext);
                $('#boy').css('color',colortxt);
                $('#or').hide();
                $('#girl').hide();
                document.getElementsByTagName("body")[0].style.backgroundColor = color;
                document.getElementsByTagName("body")[0].style.backgroundImage = 'none';

                $('#H3').hide();
                $('#H4').hide();
                $('#scratcher3Pct').hide();

                confetti_effect();
            }
        }
    };

    function check1() {
        if (!triggered) {
            if ((pct1>15 && pct2>15 && pct6>15)) {
                if (CrispyToast.toasts.length===0) {
                    CrispyToast.error('Scratch other circles. You havent find the gender yet!',{ position: 'top-center', timeout: 2000});
                }
            }
        }
    }

    function check2() {
        if (!triggered) {
            if (pct3>0 && pct4>0 && pct5>0)  {
                if (pct3<15 || pct4<15 || pct5<15)  {
                   if (CrispyToast.toasts.length===0){
                        CrispyToast.success('Scratch MORE!',{ position: 'top-center',timeout: 2000});
                    }
                }   
            }
        }
    }

    function scratcher1Changed(ev) {
        pct1 = (this.fullAmount(40) * 100)|0;
        check1();
        checkpct();
    };

    function scratcher2Changed(ev) {
        pct2 = (this.fullAmount(40) * 100)|0;
        check1();
        checkpct();
    };

    function scratcher3Changed(ev) {
        pct3 = (this.fullAmount(40) * 100)|0;
        check2();
        checkpct();
    };

    function scratcher4Changed(ev) {
        pct4 = (this.fullAmount(40) * 100)|0;
        check2();
        checkpct();
    };

    function scratcher5Changed(ev) {
        pct5 = (this.fullAmount(40) * 100)|0;
        check2();
        checkpct();
    };

    function scratcher6Changed(ev) {
        pct6 = (this.fullAmount(40) * 100)|0;
        check1();
        checkpct();
    };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    };

    function confetti_effect() {
