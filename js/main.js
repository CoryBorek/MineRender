var JQUERY_VERSION = "3.3.1";
var THREE_VERSION = "94";
var JQUERY_HASH = "sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=";
var THREE_HASH = "sha256-NGC9JEuTWN4GhTj091wctgjzftr+8WNDmw0H8J5YPYE=";


// Showcases


var randomSkins;

function getRandomSkin() {
    var skin = randomSkins.splice(Math.floor(Math.random() * randomSkins.length), 1)[0];
    if (skin.indexOf("|") !== -1) {
        var split = skin.split("|");
        return {
            name: split[0],
            skin: split[1]
        }
    }
    return {
        name: skin,
        skin: skin
    }
}


function renderSkinShowcases() {
    var renders = [];
    for (var i = 0; i < 3; i++) {
        var skin = getRandomSkin();
        var element = $("#skinExample" + (i + 1));
        $("#skinName" + (i + 1)).text(skin.name)
        var skinRender = new SkinRender({
            autoResize: true,
            canvas: {
                width: element[0].offsetWidth,
                height: element[0].offsetHeight
            },
            render: {
                taa: true
            },
            controls: {
                enabled: true,
                zoom: false,
                rotate: true,
                pan: true
            },
            forceContext: true
        }, element[0]);
        element.on("skinRender", function (e) {
            if (e.detail.playerModel) {
                e.detail.playerModel.rotation.y += 0.01;
                e.detail.playerModel.children[2].rotation.z = -0.1;
                e.detail.playerModel.children[3].rotation.z = 0.1;
                e.detail.playerModel.children[6].rotation.x = 0.1;
            }
        })
        renders[i] = skinRender;
        (function (skinRender, i) {
            let data = {
                capeUrl: "https://minerender.org/img/optifine_cape.png",
                optifine: true
            };
            if (skin.skin.length > 16) {
                data.data = skin.skin;
            } else {
                data.username = skin.skin;
            }
            setTimeout(function () {
                skinRender.render(data, function () {
                    $("#skinPlaceholder" + (i + 1)).remove();
                })
            }, 200 * i);
        })(skinRender, i);
    }
}



function openSkinModal() {
    $("#skin-modal").find("pre").each(function () {
        Prism.highlightElement(this)
    })
    $("#skin-modal").modal();

    var skin = getRandomSkin();
    $("#js-example-skin").text(skin.name);
    $("#iframe-example-skin").text(skin.name);

    $("#skin-modal").modal("open");
}




$(document).ready(function () {
    console.log("Document is ready!")

    randomSkins = skins.splice(0);

    $(".jquery-version").text(JQUERY_VERSION);
    $(".three-version").text(THREE_VERSION);
    $(".jquery-hash").text(JQUERY_HASH);
    $(".three-hash").text(THREE_HASH);
    $(".minerender-version").text(VERSION);

    setTimeout(function () {
        setTimeout(renderSkinShowcases, 200);
        setTimeout(renderBlockShowcases, 400);
        setTimeout(renderItemShowcases, 600);
        setTimeout(renderEntityShowcases, 800);
        setTimeout(renderGUIShowcases, 1000);
        setTimeout(renderRecipeShowcases, 1200);
        setTimeout(renderResourcePackShowcases, 1400);
    }, 500);

    // Modal functions


    $(".skinInstructions").click(openSkinModal);
    $(".blockInstructions").click(openBlockModal);
    $(".itemInstructions").click(openItemModal);
    $(".entityInstructions").click(openEntityModal);
    $(".guiInstructions").click(openGuiModal);
    $(".recipeInstructions").click(openRecipeModal);


    $("pre").click(function () {
        SelectText(this);
    });

    /// https://stackoverflow.com/a/8803160/6257838
    function SelectText(text) {
        if (document.body.createTextRange) { // ms
            var range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);

        }
    }
})
