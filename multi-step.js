// -- reverted on 10/5/24 -- force updated
//reason - checkbox issue
//reverted bug: required checkbox validation wasn't working on the last step
let x = 0x0;
let lastStep = 0x0;
let curStep = 0x0;
let countCard = true;
let fill = false;
let inputFilled = true;
let skip;
let urlFilled = true;
let selectFilled = true;
let radioFilled = true;
let dateFilled = true;
let timeFilled = true;
let checkboxFilled = true;
let emailFilled = true;
let textareaFilled = true;
let telFilled = true;
let passwordFilled = true;
let fileFilled = true;
let numFilled = true;
let answer = "";
let selections = [];
let selection = [];
let empReqInput = [];
let empReqUrl = [];
let empReqDate = [];
let empReqTime = [];
let empReqRadio = [];
let empReqSelect = [];
let empReqTextarea = [];
let empReqFile = [];
let empReqPassword = [];
let empReqNum = [];
let empReqTel = [];
let textareaLength = 0x0;
let textInputLength = 0x0;
let emailInputLength = 0x0;
let selectInputLength = 0x0;
let checkboxInputLength = 0x0;
let filledInput = [];
let savedFilledInput = [];
let progress = 0x0;
let skipTo = 0x0;
let next = false;
let back = false;
let selArr = [];
let selString = [];
let emptyInput = 0x0;
let selTotal = 0x0;
let searchQ = [];
let domainAllowed = true;
let dom = [];
let successCard = "";
let redirectTo = "";
let totalSteps = 0x0;
let checkCount = 0x0;
let newTab = true;
let unfilledArr = [];
let notRobot = true;
let all_data = [];
var ogCloneArr = [];
let steps = $("[data-form=\"step\"]");
let progressbarClone = $("[data-form=\"progress-indicator\"]").clone();
let progressbar;
let weightedSelection = $("[data-weighted-selection]").data("weighted-selection");
let weightedSelectionRange = $("[data-weighted-selection-range]").data("weighted-selection-range");
let customError = $("[data-custom-error-message]").data("custom-error-message");
let reinitIX = $("[data-reinit]").data("reinit");
let memory = $("[data-memory]").data("memory");
let quiz = $("[data-quiz]").data("quiz");
const urlFormly = new URL(window.location.href);
let _params = $("[data-query-param]").data("query-param");
let logicExtra = $("[data-form=\"multistep\"]").data("logic-extra");
let oldSubmitText = $("[data-form=\"submit-btn\"]").val();
let oldResetText = $("[data-btn=\"reset\"]").text();
let formReset = $("[data-form=\"multistep\"]").data("reset");
let resetDelay = $("[data-reset-delay]").data("reset-delay") ? $("[data-reset-delay]").data("reset-delay") : 0x7d0;
let redirectDelay = $("[data-redirect-delay]").data("redirect-delay") ? $("[data-redirect-delay]").data("redirect-delay") : 0x64;
let phoneFormat = $("[data-form=\"multistep\"]").data("phone-validation");
let scrollToTop = $("[data-form=\"multistep\"]").data("scroll-top");
let trackLastStep = $("[data-last-step]").data("last-step");
let conditionalResult = $("[data-conditional-result]").data("conditional-result") === "AND";
let scrollTopOffset = parseInt($("[data-form=\"multistep\"]").data("scroll-top-offset"));
savedFilledInput = JSON.parse(localStorage.getItem("filledInput"));
formlyLastStep = JSON.parse(localStorage.getItem("formlyLastStep"));
formlyLastStepAnswer = JSON.parse(localStorage.getItem("formlyLastStepAnswer"));
if (trackLastStep) {
    if (formlyLastStep > x) {
        x = formlyLastStep;
    }
    if (formlyLastStepAnswer) {
        selections = formlyLastStepAnswer;
    }
}
$("[data-clone]").each(function() {
    ogCloneArr.push({
        name: $(this).data("clone"),
        element: $(this).clone(true),
        display: $("[data-display=\"" + $(this).data("clone") + "\"]").eq(0x0).clone(true)
    });
});
if ($("div.g-recaptcha").length > 0x0) {
    notRobot = false;
}

function recaptcha(_0x45142b) {
    notRobot = true;
}
if ($(steps[x]).data("card") || $(steps[x]).find(".active-answer-card").data("card")) {
    next = true;
}
if ($("[data-count-card]").length > 0x0) {
    countCard = $("[data-count-card]").data("count-card");
}
$("[data-text=\"error-message\"]").hide();
$(progressbarClone).removeClass("current");
$("[data-form=\"progress\"]").children().remove();
$("[data-form=\"submit-btn\"]").hide();
$("[data-form-ms=\"submit-btn\"]").hide();
steps.each(function() {
    $("[data-form=\"progress\"]").append(progressbarClone.clone(true, true));
});
$("[data-input-field]").hide();
if (countCard) {
    curStep = curStep + 0x1;
    totalSteps = steps.length;
    $("[data-text=\"total-steps\"]").text(totalSteps);
} else {
    if ($(steps[x]).data("card")) {
        curStep = curStep + 0x0;
    } else {
        curStep = curStep + 0x1;
    }
    totalSteps = $("[data-form=\"step\"]:not([data-card=\"true\"])").length;
    $("[data-text=\"total-steps\"]").text(totalSteps);
    $("[data-form=\"step\"][data-card]").each(function() {
        $($("[data-form=\"progress-indicator\"]")[$(this).index()]).hide();
    });
}
progressbar = $("[data-form=\"progress\"]").children();
$("[data-form=\"progress-indicator\"]").on("click", clickableIndicator);
$("[data-text=\"current-step\"]").text(curStep);
steps.hide();
$("[data-success-card]").hide();
$("[data-form=\"next-btn\"][type=\"submit\"]").each(function() {
    $(this).attr("type", "button");
});

function getParams() {
    urlFormly.searchParams.forEach(function(_0x4eaf83, _0x12c55f) {
        searchQ.push({
            val: _0x4eaf83,
            key: _0x12c55f
        });
    });
}

function getSafe(_0x551384, _0x3af2e8) {
    try {
        return _0x551384();
    } catch (_0x8d781a) {
        return _0x3af2e8;
    }
}

function phoneAutoFormat(_0x60ebf3) {
    var _0x5b5470 = "";
    return function(_0x8d7259) {
        var _0x41ccce = "";
        var _0x31085e = _0x8d7259.replace(/\D/g, "");
        var _0x416bf9 = 0x0;
        var _0x55e741 = 0x0;
        while (_0x416bf9 < _0x31085e.length && _0x55e741 < _0x60ebf3.length) {
            if (_0x60ebf3[_0x55e741] === "x") {
                _0x41ccce += _0x31085e[_0x416bf9];
                _0x416bf9++;
            } else {
                _0x41ccce += _0x60ebf3[_0x55e741];
            }
            _0x55e741++;
        }
        if (_0x8d7259.length < _0x5b5470.length) {
            var _0x13ddf6 = _0x60ebf3.slice(_0x55e741);
            _0x41ccce += _0x13ddf6.replace(/x/g, "");
        }
        _0x5b5470 = _0x41ccce;
        return _0x41ccce;
    };
}

function validateURL(_0xf4105a) {
    return !!/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(_0xf4105a);
}
if (quiz) {
    steps.each(function() {
        $(this).children().attr("data-radio-skip", true);
        $(this).children().attr("data-radio-delay", 0xfa);
    });
}

function disableBtn(_0x59e8ba) {
    fill = false;
    if (!customError) {
        $("[data-form=\"next-btn\"]").css({
            opacity: "0.4",
            "pointer-events": "none"
        });
        $("[data-form=\"next-btn\"]").addClass("disabled");
        $("[data-form=\"submit-btn\"]").css({
            opacity: "0.4",
            "pointer-events": "none"
        });
        $("[data-form=\"submit-btn\"]").addClass("disabled");
        $("[data-form-ms=\"submit-btn\"]").css({
            opacity: "0.4",
            "pointer-events": "none"
        });
        $("[data-form-ms=\"submit-btn\"]").addClass("disabled");
    }
}

function enableBtn() {
    fill = true;
    $("[data-form=\"next-btn\"]").css({
        "pointer-events": "auto",
        opacity: "1"
    });
    $("[data-form=\"next-btn\"]").removeClass("disabled");
    $("[data-form=\"submit-btn\"]").css({
        "pointer-events": "auto",
        opacity: "1"
    });
    $("[data-form=\"submit-btn\"]").removeClass("disabled");
    $("[data-form-ms=\"submit-btn\"]").css({
        "pointer-events": "auto",
        opacity: "1"
    });
    $("[data-form-ms=\"submit-btn\"]").removeClass("disabled");
}

function saveLastAnswer(_0x26beee) {
    localStorage.removeItem("formlyLastStepAnswer");
    localStorage.setItem("formlyLastStepAnswer", JSON.stringify(_0x26beee));
}

function saveFilledInput() {
    $("form[data-form=\"multistep\"] :input").not("[type=\"submit\"]").each(function() {
        if ($(this).attr("type") === "checkbox" || $(this).attr("type") === "radio") {
            if ($(this).prop("checked")) {
                if (filledInput.some(_0x3d979f => _0x3d979f.inputName === $(this).attr("name"))) {
                    filledInput = filledInput.filter(_0x42f311 => _0x42f311.inputName !== $(this).attr("name"));
                    if ($(this).val() !== "") {
                        filledInput.push({
                            inputName: $(this).attr("name"),
                            value: $(this).val()
                        });
                    }
                } else if ($(this).val() !== "") {
                    filledInput.push({
                        inputName: $(this).attr("name"),
                        value: $(this).val()
                    });
                }
            }
        } else if (filledInput.some(_0x544928 => _0x544928.inputName === $(this).attr("name"))) {
            filledInput = filledInput.filter(_0x56ca55 => _0x56ca55.inputName !== $(this).attr("name"));
            if ($(this).val() !== "") {
                filledInput.push({
                    inputName: $(this).attr("name"),
                    value: $(this).val()
                });
            }
        } else if ($(this).val() !== "") {
            filledInput.push({
                inputName: $(this).attr("name"),
                value: $(this).val()
            });
        }
    });
    if (trackLastStep) {
        if (formlyLastStep > x) {
            lastStep = formlyLastStep;
        } else {
            lastStep = x;
        }
        localStorage.removeItem("formlyLastStep");
        localStorage.setItem("formlyLastStep", lastStep);
    }
    localStorage.removeItem("filledInput");
    localStorage.setItem("filledInput", JSON.stringify(filledInput));
}

function scrollTop() {
    if (scrollToTop) {
        $("html, body").animate({
            scrollTop: $("[data-form=\"multistep\"]").offset().top - scrollTopOffset
        }, 0x3e8);
    }
}

function updateStep() {
    scrollTop();
    skip = false;
    $("[data-form=\"custom-progress-indicator\"]").removeClass("disabled");
    if ($("[data-clickable]").data("clickable")) {
        steps.find(":input[required]").each(function() {
            $($("[data-form=\"custom-progress-indicator\"]")[$(this).parents("[data-form=\"step\"]").index()]);
            if ($(this).val() === "") {
                emptyInput++;
            }
        });
        if (emptyInput > 0x0) {
            $("input[type=\"submit\"]").addClass("disabled");
        } else {
            $("input[type=\"submit\"]").removeClass("disabled");
        }
    }
    $("[data-form=\"custom-progress-indicator\"]").removeClass("current");
    $("[data-form=\"custom-progress-indicator\"]").addClass("disabled");
    $($("[data-form=\"custom-progress-indicator\"]")[x]).addClass("current");
    selection = selections.filter(_0x4ca74f => _0x4ca74f.step === x - 0x1);
    if (next) {
        x = getSafe(() => selection[0x0].skipTo) ? parseInt(getSafe(() => selection[0x0].skipTo)) : x;
    }
    $("[data-answer]").hide();
    steps.hide();
    if (reinitIX === true) {
        window.Webflow.destroy();
    }
    $(progressbar).removeClass("current");
    for (i = 0x0; i <= x; i++) {
        if (countCard) {
            $(progressbar[i]).addClass("current");
        } else if (!$(steps[i]).data("card")) {
            $(progressbar[i]).addClass("current");
        }
    }
    if (reinitIX === true) {
        if (window.Webflow) {
            window.Webflow.require("ix2").init();
        }
        document.dispatchEvent(new Event("readystatechange"));
        $(steps[x]).show();
    } else {
        $(steps[x]).fadeIn("slow");
    }
    $(".active-answer-card").removeClass("active-answer-card");
    if (x === 0x0 && !$(steps[x]).data("card")) {
        $(steps[x]).find("[data-answer]").show();
        $(steps[x]).find("[data-answer]").addClass("active-answer-card");
    }
    if (selection.length > 0x0) {
        $(steps[x]).find("[data-answer=\"" + selection[0x0].selected + "\"]").show();
        $(steps[x]).find("[data-answer=\"" + selection[0x0].selected + "\"]").addClass("active-answer-card");
    } else {
        $(steps[x]).find("[data-answer=\"" + answer + "\"]").show();
        $(steps[x]).find("[data-answer=\"" + answer + "\"]").addClass("active-answer-card");
    }
    if (x === 0x0) {
        $("[data-form=\"back-btn\"]").hide();
        $("[data-form=\"next-btn\"]").show();
        $("[data-form=\"submit-btn\"]").hide();
    } else {
        if (x === steps.length - 0x1 || $(steps[x]).find("[data-form=\"submit\"]:visible").length > 0x0) {
            $("[data-form=\"next-btn\"]").hide();
            if ($(steps[x]).find("[data-form=\"next-btn\"][data-submit-show]").data("submit-show")) {
                $(steps[x]).find("[data-form=\"next-btn\"][data-submit-show]").show();
            } else if ($("[data-form=\"next-btn\"]").data("submit-show")) {
                $("[data-form=\"next-btn\"]").show();
            }
            $("[data-form=\"submit-btn\"]").show();
            $("[data-form-ms=\"submit-btn\"]").show();
            $("[data-form=\"back-btn\"]").show();
        } else {
            $("[data-form=\"next-btn\"]").show();
            $("[data-form=\"back-btn\"]").show();
            $("[data-form=\"submit-btn\"]").hide();
            $("[data-form-ms=\"submit-btn\"]").hide();
        }
    }
    $($(steps[x]).find("input[autofocus]")[0x0]).focus();
    $($(steps[x]).find("textarea[autofocus]")[0x0]).focus();
    validation();
    for (idx = 0x0; idx <= x; idx++) {
        $($("[data-form=\"custom-progress-indicator\"]")[idx]).removeClass("disabled");
    }
}

function validateEmail(_0x19cc6b, _0x74b92e, _0x1981de) {
    let _0x46d750 = _0x19cc6b.includes("@") ? _0x19cc6b.split("@")[0x1].split(".")[0x0] : [];
    dom = [];
    if (_0x74b92e !== undefined) {
        _0x74b92e.split(",").forEach(function(_0x4c724d) {
            if (_0x4c724d.includes(_0x46d750)) {
                dom.push(_0x46d750);
            }
        });
    }
    if (dom.length > 0x0) {
        domainAllowed = false;
    } else {
        domainAllowed = true;
    }
    if (!/^([\w-\.+]+@([\w-]+\.)+[\w-]{2,20})?$/.test(_0x19cc6b) || !domainAllowed) {
        emailFilled = false;
        unfilledArr.push({
            input: _0x1981de
        });
    } else {
        emailFilled = true;
    }
}

function phoneValidation(_0x129567, _0x598dc5, _0x35bea5) {
    if (phoneFormat) {
        return !!(_0x598dc5 >= _0x35bea5);
    } else {
        if (_0x598dc5 >= _0x35bea5) {
            return true;
        }
    }
}

function validation() {
    if ($(steps[x]).data("card")) {
        enableBtn();
    }
    unfilledArr = [];
    inputFilled = true;
    radioFilled = true;
    checkboxFilled = true;
    numFilled = true;
    fileFilled = true;
    dateFilled = true;
    timeFilled = true;
    selectFilled = true;
    textareaFilled = true;
    telFilled = true;
    emailFilled = true;
    passwordFilled = true;
    emptyInput = 0x0;
    empReqInput = [];
    empReqDate = [];
    empReqTime = [];
    empReqSelect = [];
    empReqTel = [];
    empReqTextarea = [];
    empReqNum = [];
    empReqFile = [];
    empReqRadio = [];
    textareaLength = $(steps[x]).find("textarea[required]:visible").length;
    textInputLength = $(steps[x]).find("input[type=\"text\"][required]:visible").length;
    selectInputLength = $(steps[x]).find("select[required]:visible").length;
    emailInputLength = $(steps[x]).find("input[type=\"email\"]:visible").length;
    checkboxInputLength = $(steps[x]).find("input[type=\"checkbox\"]:visible").length;
    if (textInputLength > 0x0 || selectInputLength > 0x0 || textareaLength > 0x0) {
        disableBtn();
    } else {
        enableBtn();
    }
    checkCount = $(steps[x]).data("checkbox") ? $(steps[x]).data("checkbox") : $(steps[x]).find("[data-checkbox]").length > 0x0 ? $(steps[x]).find("[data-checkbox]").data("checkbox") : 0x0;
    if (!logicExtra) {
        if ($(steps[x]).find(":input").is("[type=\"checkbox\"]")) {
            if (checkCount === "*" || checkCount > $(steps[x]).find(":input[type=\"checkbox\"]").length) {
                $(steps[x]).find(":input[type=\"checkbox\"]").each(function() {
                    if ($(this).is(":checked")) {
                        if ($(steps[x]).find(":input[type=\"checkbox\"][required]").length < 0x1) {
                            checkboxFilled = true;
                            resetInputErrorMessage($(this).attr("name"));
                        }
                    } else {
                        checkboxFilled = false;
                        unfilledArr.push({
                            input: $(this).attr("name")
                        });
                    }
                });
            } else if ($(steps[x]).find(":input[type=\"checkbox\"]:checked").length >= checkCount) {
                if ($(steps[x]).find(":input[type=\"checkbox\"][required]").length > 0x0) {
                    $(steps[x]).find(":input[type=\"checkbox\"][required]").each(function() {
                        checkboxFilled = false;
                        let _0x147644 = $(steps[x]).find(":input[type=\"checkbox\"][required]").length;
                        let _0x54cda2 = $(steps[x]).find(":input[type=\"checkbox\"][required]:checked").length;
                        if (_0x147644 - _0x54cda2 === 0x0) {
                            checkboxFilled = true;
                            resetInputErrorMessage($(steps[x]).find(":input[type=\"checkbox\"]").attr("name"));
                        } else {
                            checkboxFilled = false;
                            $(steps[x]).find(":input[type=\"checkbox\"][required]:not(:checked)").each(function() {
                                unfilledArr.push({
                                    input: $(this).attr("name")
                                });
                            });
                        }
                    });
                } else {
                    checkboxFilled = true;
                    resetInputErrorMessage($(steps[x]).find(":input[type=\"checkbox\"]").attr("name"));
                }
            } else {
                checkboxFilled = false;
                $(steps[x]).find(":input[type=\"checkbox\"][required]").each(function() {
                    if ($(this).not(":checked")) {
                        unfilledArr.push({
                            input: $(this).attr("name")
                        });
                    }
                });
                unfilledArr.push({
                    input: $(steps[x]).find(":input[type=\"checkbox\"]").attr("name")
                });
            }
        }
        $(steps[x]).find("input:radio[required]").each(function(_0x32ec71) {
            var _0xf5905b = $(this).attr("name");
            if ($("input:radio[name=\"" + _0xf5905b + "\"]:checked").length == 0x0) {
                if (!empReqRadio.find(_0x3072f9 => _0x3072f9.input === _0x32ec71)) {
                    empReqRadio.push({
                        input: _0x32ec71
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            } else {
                empReqRadio = empReqRadio.filter(_0x489365 => _0x489365.input !== _0x32ec71);
            }
            if (empReqRadio.length === 0x0) {
                radioFilled = true;
            } else {
                radioFilled = false;
            }
        });
        $(steps[x]).find(":input[type=\"text\"][required]").each(function(_0x4cddbe) {
            let _0x1e883d = $(this).val().length;
            let _0x1fa08b = $(this).data("min-character") ? $(this).data("min-character") : 0x0;
            if ($(this).val() !== "" && _0x1e883d >= _0x1fa08b) {
                empReqInput = empReqInput.filter(_0x43d0e3 => _0x43d0e3.input !== _0x4cddbe);
            } else {
                if (!empReqInput.find(_0x256799 => _0x256799.input === _0x4cddbe)) {
                    empReqInput.push({
                        input: _0x4cddbe
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqInput.length === 0x0) {
                inputFilled = true;
            } else {
                inputFilled = false;
            }
        });
        $(steps[x]).find(":input[type=\"password\"][required]").each(function(_0x3578d0) {
            let _0x34a226 = $(this).val().length;
            let _0x3506ce = $(this).data("min-character") ? $(this).data("min-character") : 0x0;
            if ($(this).val() !== "" && _0x34a226 >= _0x3506ce) {
                empReqPassword = empReqPassword.filter(_0x5af046 => _0x5af046.input !== _0x3578d0);
            } else {
                if (!empReqPassword.find(_0x30e8c6 => _0x30e8c6.input === _0x3578d0)) {
                    empReqPassword.push({
                        input: _0x3578d0
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqPassword.length === 0x0) {
                passwordFilled = true;
            } else {
                passwordFilled = false;
            }
        });
        $(steps[x]).find(":input[type=\"url\"][required]").each(function(_0x17cbec) {
            let _0x1684aa = $(this).val().length;
            let _0x4f1600 = $(this).data("min-character") ? $(this).data("min-character") : 0x0;
            if ($(this).val() !== "" && _0x1684aa >= _0x4f1600) {
                empReqUrl = empReqUrl.filter(_0x585510 => _0x585510.input !== _0x17cbec);
            } else {
                if (!empReqTime.find(_0x43d3f8 => _0x43d3f8.input === _0x17cbec)) {
                    empReqUrl.push({
                        input: _0x17cbec
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqUrl.length === 0x0 && !!/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test($(this).val())) {
                urlFilled = true;
            } else {
                urlFilled = false;
            }
        });
        $(steps[x]).find(":input[type=\"time\"][required]").each(function(_0x3eb2f4) {
            let _0x7e9976 = $(this).val().length;
            let _0x536ff0 = $(this).data("min-character") ? $(this).data("min-character") : 0x0;
            if ($(this).val() !== "" && _0x7e9976 >= _0x536ff0) {
                empReqTime = empReqTime.filter(_0x193457 => _0x193457.input !== _0x3eb2f4);
            } else {
                if (!empReqTime.find(_0x44b24a => _0x44b24a.input === _0x3eb2f4)) {
                    empReqTime.push({
                        input: _0x3eb2f4
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqTime.length === 0x0) {
                timeFilled = true;
            } else {
                timeFilled = false;
            }
        });
        $(steps[x]).find(":input[type=\"date\"][required]").each(function(_0x38510) {
            if ($(this).val() !== "") {
                empReqDate = empReqDate.filter(_0x5b1e6c => _0x5b1e6c.input !== _0x38510);
            } else {
                if (!empReqDate.find(_0x1ad287 => _0x1ad287.input === _0x38510)) {
                    empReqDate.push({
                        input: _0x38510
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqDate.length === 0x0) {
                dateFilled = true;
            } else {
                dateFilled = false;
            }
        });
        $(steps[x]).find(":input[type=\"tel\"][required]").each(function(index, element) {
    let inputValue = $(element).val();
    let valueLength = inputValue.length;
    let minCharacters = $(element).data("min-character") ? $(element).data("min-character") : 0;
    
    if (inputValue !== "") {
        if ($(element).data("phone-autoformat")) {
            let phoneFormatter = phoneAutoFormat($(element).data("phone-autoformat"));
            $(element).val(phoneFormatter(inputValue));
            inputValue = $(element).val(); // Update inputValue after formatting
        }
        
        if (phoneValidation(inputValue, valueLength, minCharacters)) {
            empReqTel = empReqTel.filter(inputObj => inputObj.input !== element);
        } else {
            empReqTel.push({ input: element });
        }
        
        // Text input validation
        if (valueLength >= minCharacters) {
            empReqInput = empReqInput.filter(inputObj => inputObj.input !== element);
        } else {
            if (!empReqInput.find(inputObj => inputObj.input === element)) {
                empReqInput.push({ input: element });
            }
            unfilledArr.push({ input: $(element).attr("name") });
        }
        
    } else {
        if (!empReqTel.find(inputObj => inputObj.input === element)) {
            empReqTel.push({ input: element });
        }
        unfilledArr.push({ input: $(element).attr("name") });
    }

    telFilled = empReqTel.length && (valueLength >= minCharacters) === 0;
});
        $(steps[x]).find(":input[type=\"file\"][required]").each(function(_0x18507f) {
            if ($(this).val() !== "") {
                empReqFile = empReqFile.filter(_0x6e4ebb => _0x6e4ebb.input !== _0x18507f);
            } else {
                if (!empReqFile.find(_0x412ce6 => _0x412ce6.input === _0x18507f)) {
                    empReqFile.push({
                        input: _0x18507f
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqFile.length === 0x0) {
                fileFilled = true;
            } else {
                fileFilled = false;
            }
        });
        $(steps[x]).find(":input[type=\"number\"][required]").each(function(_0x51132c) {
            let _0xea0b23 = $(this).val().length;
            let _0x1436bf = $(this).data("min-character") ? $(this).data("min-character") : 0x0;
            if ($(this).val() !== "" && _0xea0b23 >= _0x1436bf) {
                empReqNum = empReqNum.filter(_0x243198 => _0x243198.input !== _0x51132c);
            } else {
                if (!empReqNum.find(_0x5e64dd => _0x5e64dd.input === _0x51132c)) {
                    empReqNum.push({
                        input: _0x51132c
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqNum.length === 0x0) {
                numFilled = true;
            } else {
                numFilled = false;
            }
        });
        $(steps[x]).find("select[required]").each(function(_0x2cf6bf) {
            let _0xa9b081 = $(this).val();
            if (_0xa9b081 === "") {
                _0xa9b081 = null;
            }
            if (_0xa9b081 != null) {
                empReqSelect = empReqSelect.filter(_0x53b86f => _0x53b86f.input !== _0x2cf6bf);
            } else {
                if (!empReqSelect.find(_0x2e427e => _0x2e427e.input === _0x2cf6bf)) {
                    empReqSelect.push({
                        input: _0x2cf6bf
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqSelect.length === 0x0) {
                selectFilled = true;
            } else {
                selectFilled = false;
            }
        });
        $(steps[x]).find("textarea[required]").each(function(_0x984675) {
            let _0xc6f56d = $(this).val().length;
            let _0x165ccb = $(this).data("min-character") ? $(this).data("min-character") : 0x0;
            if ($(this).val() !== "" && _0xc6f56d >= _0x165ccb) {
                empReqTextarea = empReqTextarea.filter(_0x41096c => _0x41096c.input !== _0x984675);
            } else {
                if (!empReqTextarea.find(_0x261735 => _0x261735.input === _0x984675)) {
                    empReqTextarea.push({
                        input: _0x984675
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqTextarea.length === 0x0) {
                textareaFilled = true;
            } else {
                textareaFilled = false;
            }
        });
        $(steps[x]).find(":input[type=\"email\"][required]").each(function() {
            if ($(this).val() !== "") {
                validateEmail($(this).val(), $(this).data("block-domain"), $(this).attr("name"));
            } else {
                emailFilled = false;
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
        });
    } else {
        if ($(steps[x]).data("card")) {
            answer = $(steps[x]).find("[data-go-to]").data("go-to");
            selections = selections.filter(_0x3869ae => _0x3869ae.step !== x);
            selections.push({
                step: x,
                selected: answer
            });
            next = true;
            back = false;
        } else if ($(steps[x]).find(".active-answer-card").data("card")) {
            answer = $(steps[x]).find(".active-answer-card").data("go-to");
            selections = selections.filter(_0x56d178 => _0x56d178.step !== x);
            selections.push({
                step: x,
                selected: answer
            });
            next = true;
            back = false;
        }
        if ($(steps[x]).find(".active-answer-card").find(":input").is("[type=\"checkbox\"]")) {
            if (checkCount === "*" || checkCount > $(steps[x]).find(":input[type=\"checkbox\"]").length) {
                $(steps[x]).find(":input[type=\"checkbox\"]").each(function() {
                    if ($(this).is(":checked")) {
                        if ($(steps[x]).find(":input[required]").length < 0x1) {
                            skipTo = undefined;
                            if ($(this).parents("[data-skip-to]").data("skip-to")) {
                                skipTo = $(this).parents("[data-skip-to]").data("skip-to");
                            }
                            if ($(this).parents("[data-go-to]").attr("data-go-to")) {
                                answer = $(this).parents("[data-go-to]").attr("data-go-to");
                                selections = selections.filter(_0x495d46 => _0x495d46.step !== x);
                                selections.push({
                                    step: x,
                                    selected: answer
                                });
                                if (skipTo) {
                                    selections = selections.filter(_0x40490d => _0x40490d.step !== skipTo - 0x2);
                                    selections.push({
                                        step: skipTo - 0x2,
                                        selected: answer
                                    });
                                    objIndex = selections.findIndex(_0x510a90 => _0x510a90.step === x);
                                    selections[objIndex].skipTo = parseInt(skipTo) - 0x1;
                                    selections[objIndex].backTo = x;
                                }
                            }
                            checkboxFilled = true;
                            if ($(steps[x]).find(":input[type=\"checkbox\"][required]:checked").length >= $(steps[x]).find(":input[type=\"checkbox\"][required]").length) {
                                resetInputErrorMessage($(steps[x]).find(":input[type=\"checkbox\"]").attr("name"));
                            }
                        }
                    } else {
                        checkboxFilled = false;
                        unfilledArr.push({
                            input: $(this).attr("name")
                        });
                    }
                });
            } else if ($(steps[x]).find(".active-answer-card").find(":input[type=\"checkbox\"]:checked").length >= checkCount) {
                if ($(steps[x]).find(".active-answer-card").find(":input[type=\"checkbox\"]").parents("[data-go-to]").attr("data-go-to")) {
                    skipTo = undefined;
                    if ($(steps[x]).find(".active-answer-card").find(":input[type=\"checkbox\"]").parents("[data-skip-to]").attr("data-skip-to")) {
                        skipTo = $(steps[x]).find(".active-answer-card").find(":input[type=\"checkbox\"]:checked").parents("[data-skip-to]").attr("data-skip-to");
                    }
                    answer = $(steps[x]).find(".active-answer-card").find(":input[type=\"checkbox\"]").parents("[data-go-to]").attr("data-go-to");
                    selections = selections.filter(_0x150012 => _0x150012.step !== x);
                    selections.push({
                        step: x,
                        selected: answer
                    });
                    if (skipTo) {
                        selections = selections.filter(_0x38ec2e => _0x38ec2e.step !== skipTo - 0x2);
                        selections.push({
                            step: skipTo - 0x2,
                            selected: answer
                        });
                        objIndex = selections.findIndex(_0x21f9c5 => _0x21f9c5.step === x);
                        selections[objIndex].skipTo = parseInt(skipTo) - 0x1;
                        selections[objIndex].backTo = x;
                    }
                }
                checkboxFilled = true;
                if ($(steps[x]).find(":input[type=\"checkbox\"][required]:checked").length >= $(steps[x]).find(":input[type=\"checkbox\"][required]").length) {
                    resetInputErrorMessage($(steps[x]).find(":input[type=\"checkbox\"]").attr("name"));
                }
            } else {
                checkboxFilled = false;
                $(steps[x]).find(":input[type=\"checkbox\"][required]").each(function() {
                    if ($(this).not(":checked")) {
                        unfilledArr.push({
                            input: $(this).attr("name")
                        });
                    }
                });
            }
        }
        $(steps[x]).find(".active-answer-card").find("input:radio[required]").each(function(_0x24467a) {
            var _0x5af790 = $(this).attr("name");
            if ($("input:radio[name=\"" + _0x5af790 + "\"]:checked").length == 0x0) {
                if (!empReqRadio.find(_0x538d62 => _0x538d62.input === _0x24467a)) {
                    empReqRadio.push({
                        input: _0x24467a
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            } else {
                empReqRadio = empReqRadio.filter(_0x542596 => _0x542596.input !== _0x24467a);
            }
            if (empReqRadio.length === 0x0) {
                radioFilled = true;
            } else {
                radioFilled = false;
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"text\"][required]").each(function(_0x9c21ad) {
            let _0x2dbe90 = $(this).val().length;
            let _0x18813a = $(this).data("min-character") ? $(this).data("min-character") : 0x0;
            if ($(this).val() !== "" && _0x2dbe90 >= _0x18813a) {
                empReqInput = empReqInput.filter(_0x1df2c2 => _0x1df2c2.input !== _0x9c21ad);
            } else {
                if (!empReqInput.find(_0x431edd => _0x431edd.input === _0x9c21ad)) {
                    empReqInput.push({
                        input: _0x9c21ad
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqInput.length === 0x0) {
                inputFilled = true;
            } else {
                inputFilled = false;
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"text\"]").each(function(_0x3918ee) {
            skipTo = undefined;
            if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
                skipTo = $(this).parents("[data-skip-to]").data("skip-to");
            }
            if ($(this).parents("[data-go-to]").attr("data-go-to")) {
                answer = $(this).parents("[data-go-to]").attr("data-go-to");
                selections = selections.filter(_0x519266 => _0x519266.step !== x);
                selections.push({
                    step: x,
                    selected: answer
                });
                if (skipTo) {
                    selections = selections.filter(_0x558c90 => _0x558c90.step !== skipTo - 0x2);
                    selections.push({
                        step: skipTo - 0x2,
                        selected: answer
                    });
                    objIndex = selections.findIndex(_0x27474a => _0x27474a.step === x);
                    selections[objIndex].skipTo = parseInt(skipTo) - 0x1;
                    selections[objIndex].backTo = x;
                }
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"password\"][required]").each(function(_0x1058b4) {
            let _0x1cb27e = $(this).val().length;
            let _0xa769cb = $(this).data("min-character") ? $(this).data("min-character") : 0x0;
            if ($(this).val() !== "" && _0x1cb27e >= _0xa769cb) {
                empReqPassword = empReqPassword.filter(_0x3bb4ec => _0x3bb4ec.input !== _0x1058b4);
            } else {
                if (!empReqPassword.find(_0x49a728 => _0x49a728.input === _0x1058b4)) {
                    empReqPassword.push({
                        input: _0x1058b4
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqPassword.length === 0x0) {
                passwordFilled = true;
            } else {
                passwordFilled = false;
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"password\"]").each(function(_0xc47cdf) {
            skipTo = undefined;
            if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
                skipTo = $(this).parents("[data-skip-to]").data("skip-to");
            }
            if ($(this).parents("[data-go-to]").attr("data-go-to")) {
                answer = $(this).parents("[data-go-to]").attr("data-go-to");
                selections = selections.filter(_0x1bdfde => _0x1bdfde.step !== x);
                selections.push({
                    step: x,
                    selected: answer
                });
                if (skipTo) {
                    selections = selections.filter(_0x261ef8 => _0x261ef8.step !== skipTo - 0x2);
                    selections.push({
                        step: skipTo - 0x2,
                        selected: answer
                    });
                    objIndex = selections.findIndex(_0x1d9c3c => _0x1d9c3c.step === x);
                    selections[objIndex].skipTo = parseInt(skipTo) - 0x1;
                    selections[objIndex].backTo = x;
                }
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"url\"][required]").each(function(_0x492871) {
            let _0xedb8e8 = $(this).val().length;
            let _0x6ac956 = $(this).data("min-character") ? $(this).data("min-character") : 0x0;
            if ($(this).val() !== "" && _0xedb8e8 >= _0x6ac956) {
                empReqUrl = empReqUrl.filter(_0x3f9500 => _0x3f9500.input !== _0x492871);
            } else {
                if (!empReqUrl.find(_0x2b1bab => _0x2b1bab.input === _0x492871)) {
                    empReqUrl.push({
                        input: _0x492871
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqUrl.length === 0x0 && !!/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test($(this).val())) {
                urlFilled = true;
            } else {
                urlFilled = false;
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"url\"]").each(function(_0x2b8dfe) {
            skipTo = undefined;
            if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
                skipTo = $(this).parents("[data-skip-to]").data("skip-to");
            }
            if ($(this).parents("[data-go-to]").attr("data-go-to")) {
                answer = $(this).parents("[data-go-to]").attr("data-go-to");
                selections = selections.filter(_0x53f7c9 => _0x53f7c9.step !== x);
                selections.push({
                    step: x,
                    selected: answer
                });
                if (skipTo) {
                    selections = selections.filter(_0x5c646e => _0x5c646e.step !== skipTo - 0x2);
                    selections.push({
                        step: skipTo - 0x2,
                        selected: answer
                    });
                    objIndex = selections.findIndex(_0x5ed859 => _0x5ed859.step === x);
                    selections[objIndex].skipTo = parseInt(skipTo) - 0x1;
                    selections[objIndex].backTo = x;
                }
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"date\"][required]").each(function(_0x4c9451) {
            if ($(this).val() !== "") {
                empReqDate = empReqDate.filter(_0x1a4e07 => _0x1a4e07.input !== _0x4c9451);
            } else {
                if (!empReqDate.find(_0x595098 => _0x595098.input === _0x4c9451)) {
                    empReqDate.push({
                        input: _0x4c9451
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqDate.length === 0x0) {
                dateFilled = true;
            } else {
                dateFilled = false;
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"date\"]").each(function(_0x548599) {
            skipTo = undefined;
            if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
                skipTo = $(this).parents("[data-skip-to]").data("skip-to");
            }
            if ($(this).parents("[data-go-to]").attr("data-go-to")) {
                answer = $(this).parents("[data-go-to]").attr("data-go-to");
                selections = selections.filter(_0x1bc723 => _0x1bc723.step !== x);
                selections.push({
                    step: x,
                    selected: answer
                });
                if (skipTo) {
                    selections = selections.filter(_0x52696a => _0x52696a.step !== skipTo - 0x2);
                    selections.push({
                        step: skipTo - 0x2,
                        selected: answer
                    });
                    objIndex = selections.findIndex(_0x2dba76 => _0x2dba76.step === x);
                    selections[objIndex].skipTo = parseInt(skipTo) - 0x1;
                    selections[objIndex].backTo = x;
                }
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"time\"][required]").each(function(_0x4b615d) {
            if ($(this).val() !== "") {
                empReqTime = empReqTime.filter(_0x4a3d5b => _0x4a3d5b.input !== _0x4b615d);
            } else {
                if (!empReqTime.find(_0x251562 => _0x251562.input === _0x4b615d)) {
                    empReqTime.push({
                        input: _0x4b615d
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqTime.length === 0x0) {
                timeFilled = true;
            } else {
                timeFilled = false;
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"time\"]").each(function(_0x2abfed) {
            skipTo = undefined;
            if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
                skipTo = $(this).parents("[data-skip-to]").data("skip-to");
            }
            if ($(this).parents("[data-go-to]").attr("data-go-to")) {
                answer = $(this).parents("[data-go-to]").attr("data-go-to");
                selections = selections.filter(_0x12fbf5 => _0x12fbf5.step !== x);
                selections.push({
                    step: x,
                    selected: answer
                });
                if (skipTo) {
                    selections = selections.filter(_0x378167 => _0x378167.step !== skipTo - 0x2);
                    selections.push({
                        step: skipTo - 0x2,
                        selected: answer
                    });
                    objIndex = selections.findIndex(_0x30ab84 => _0x30ab84.step === x);
                    selections[objIndex].skipTo = parseInt(skipTo) - 0x1;
                    selections[objIndex].backTo = x;
                }
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"number\"][required]").each(function(_0x7fefb4) {
            let _0x20b48e = $(this).val().length;
            let _0x39ae48 = $(this).data("min-character") ? $(this).data("min-character") : 0x0;
            if ($(this).val() !== "" && _0x20b48e >= _0x39ae48) {
                empReqNum = empReqNum.filter(_0x317057 => _0x317057.input !== _0x7fefb4);
            } else {
                if (!empReqNum.find(_0x3875a5 => _0x3875a5.input === _0x7fefb4)) {
                    empReqNum.push({
                        input: _0x7fefb4
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqNum.length === 0x0) {
                numFilled = true;
            } else {
                numFilled = false;
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"number\"]").each(function(_0xb6f0dc) {
            skipTo = undefined;
            if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
                skipTo = $(this).parents("[data-skip-to]").data("skip-to");
            }
            if ($(this).parents("[data-go-to]").attr("data-go-to")) {
                answer = $(this).parents("[data-go-to]").attr("data-go-to");
                selections = selections.filter(_0x582f52 => _0x582f52.step !== x);
                selections.push({
                    step: x,
                    selected: answer
                });
                if (skipTo) {
                    selections = selections.filter(_0x3c7539 => _0x3c7539.step !== skipTo - 0x2);
                    selections.push({
                        step: skipTo - 0x2,
                        selected: answer
                    });
                    objIndex = selections.findIndex(_0x4baba0 => _0x4baba0.step === x);
                    selections[objIndex].skipTo = parseInt(skipTo) - 0x1;
                    selections[objIndex].backTo = x;
                }
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"tel\"][required]").each(function(_0x142e00) {
            if ($(this).val() !== "") {
                let _0x2cceef = $(this).val().length;
                let _0x41fb65 = $(this).data("min-character") ? $(this).data("min-character") : 0x0;
                if ($(this).data("phone-autoformat")) {
                    var _0xe6e50f = phoneAutoFormat($(this).data("phone-autoformat"));
                    $(this).val(_0xe6e50f($(this).val()));
                }
                if (phoneValidation($(this).val(), _0x2cceef, _0x41fb65)) {
                    empReqTel = empReqTel.filter(_0x5f562b => _0x5f562b.input !== _0x142e00);
                } else {
                    empReqTel.push({
                        input: _0x142e00
                    });
                }
            } else {
                if (!empReqTel.find(_0x57b807 => _0x57b807.input === _0x142e00)) {
                    empReqTel.push({
                        input: _0x142e00
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqTel.length === 0x0) {
                telFilled = true;
            } else {
                telFilled = false;
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"tel\"]").each(function(_0x823b3a) {
            skipTo = undefined;
            if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
                skipTo = $(this).parents("[data-skip-to]").data("skip-to");
            }
            if ($(this).parents("[data-go-to]").attr("data-go-to")) {
                answer = $(this).parents("[data-go-to]").attr("data-go-to");
                selections = selections.filter(_0x34495e => _0x34495e.step !== x);
                selections.push({
                    step: x,
                    selected: answer
                });
                if (skipTo) {
                    selections = selections.filter(_0x314110 => _0x314110.step !== skipTo - 0x2);
                    selections.push({
                        step: skipTo - 0x2,
                        selected: answer
                    });
                    objIndex = selections.findIndex(_0x39d1ff => _0x39d1ff.step === x);
                    selections[objIndex].skipTo = parseInt(skipTo) - 0x1;
                    selections[objIndex].backTo = x;
                }
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"file\"][required]").each(function(_0x17421a) {
            if ($(this).val() !== "") {
                empReqFile = empReqFile.filter(_0xbf29bd => _0xbf29bd.input !== _0x17421a);
            } else {
                if (!empReqFile.find(_0x33d137 => _0x33d137.input === _0x17421a)) {
                    empReqFile.push({
                        input: _0x17421a
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqFile.length === 0x0) {
                fileFilled = true;
            } else {
                fileFilled = false;
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"file\"]").each(function(_0x57ec32) {
            skipTo = undefined;
            if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
                skipTo = $(this).parents("[data-skip-to]").data("skip-to");
            }
            if ($(this).parents("[data-go-to]").attr("data-go-to")) {
                answer = $(this).parents("[data-go-to]").attr("data-go-to");
                selections = selections.filter(_0x3151e3 => _0x3151e3.step !== x);
                selections.push({
                    step: x,
                    selected: answer
                });
                if (skipTo) {
                    selections = selections.filter(_0x532be1 => _0x532be1.step !== skipTo - 0x2);
                    selections.push({
                        step: skipTo - 0x2,
                        selected: answer
                    });
                    objIndex = selections.findIndex(_0x18d66b => _0x18d66b.step === x);
                    selections[objIndex].skipTo = parseInt(skipTo) - 0x1;
                    selections[objIndex].backTo = x;
                }
            }
        });
        $(steps[x]).find(".active-answer-card").find("select[required]").each(function(_0x1a0560) {
            if ($(this).val() !== null && $(this).val() !== "") {
                empReqSelect = empReqSelect.filter(_0x52f3f6 => _0x52f3f6.input !== _0x1a0560);
            } else {
                if (!empReqSelect.find(_0x50a16f => _0x50a16f.input === _0x1a0560)) {
                    empReqSelect.push({
                        input: _0x1a0560
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqSelect.length === 0x0) {
                selectFilled = true;
            } else {
                selectFilled = false;
            }
        });
        $(steps[x]).find(".active-answer-card").find("select").each(function(_0x527437) {
            skipTo = undefined;
            if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
                skipTo = $(this).parents("[data-skip-to]").data("skip-to");
            }
            if ($(this).parents("[data-go-to]").attr("data-go-to")) {
                answer = $(this).parents("[data-go-to]").attr("data-go-to");
                selections = selections.filter(_0x465803 => _0x465803.step !== x);
                selections.push({
                    step: x,
                    selected: answer
                });
                if (skipTo) {
                    selections = selections.filter(_0x10613d => _0x10613d.step !== skipTo - 0x2);
                    selections.push({
                        step: skipTo - 0x2,
                        selected: answer
                    });
                    objIndex = selections.findIndex(_0x47063e => _0x47063e.step === x);
                    selections[objIndex].skipTo = parseInt(skipTo) - 0x1;
                    selections[objIndex].backTo = x;
                }
            }
        });
        $(steps[x]).find(".active-answer-card").find("textarea[required]").each(function(_0x3f60e9) {
            let _0x4848d1 = $(this).val().length;
            let _0x1fbb2e = $(this).data("min-character") ? $(this).data("min-character") : 0x0;
            if ($(this).val() !== "" && _0x4848d1 >= _0x1fbb2e) {
                empReqTextarea = empReqTextarea.filter(_0x3e5ffe => _0x3e5ffe.input !== _0x3f60e9);
            } else {
                if (!empReqTextarea.find(_0x5d536c => _0x5d536c.input === _0x3f60e9)) {
                    empReqTextarea.push({
                        input: _0x3f60e9
                    });
                }
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
            if (empReqTextarea.length === 0x0) {
                textareaFilled = true;
            } else {
                textareaFilled = false;
            }
        });
        $(steps[x]).find(".active-answer-card").find("textarea").each(function(_0x3c8c29) {
            skipTo = undefined;
            if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
                skipTo = $(this).parents("[data-skip-to]").data("skip-to");
            }
            if ($(this).parents("[data-go-to]").attr("data-go-to")) {
                answer = $(this).parents("[data-go-to]").attr("data-go-to");
                selections = selections.filter(_0x4f8ce0 => _0x4f8ce0.step !== x);
                selections.push({
                    step: x,
                    selected: answer
                });
                if (skipTo) {
                    selections = selections.filter(_0x1d8629 => _0x1d8629.step !== skipTo - 0x2);
                    selections.push({
                        step: skipTo - 0x2,
                        selected: answer
                    });
                    objIndex = selections.findIndex(_0x56fe7b => _0x56fe7b.step === x);
                    selections[objIndex].skipTo = parseInt(skipTo) - 0x1;
                    selections[objIndex].backTo = x;
                }
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"email\"][required]").each(function(_0x11d0ec) {
            if ($(this).val() !== "") {
                validateEmail($(this).val(), $(this).data("block-domain"), $(this).attr("name"));
            } else {
                emailFilled = false;
                unfilledArr.push({
                    input: $(this).attr("name")
                });
            }
        });
        $(steps[x]).find(".active-answer-card").find(":input[type=\"email\"]").each(function(_0x59d02f) {
            skipTo = undefined;
            if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
                skipTo = $(this).parents("[data-skip-to]").data("skip-to");
            }
            if ($(this).parents("[data-go-to]").attr("data-go-to")) {
                answer = $(this).parents("[data-go-to]").attr("data-go-to");
                selections = selections.filter(_0x2d966b => _0x2d966b.step !== x);
                console.log("selections email", selections, x);
                selections.push({
                    step: x,
                    selected: answer
                });
                if (skipTo) {
                    selections = selections.filter(_0x5cfd03 => _0x5cfd03.step !== skipTo - 0x2);
                    selections.push({
                        step: skipTo - 0x2,
                        selected: answer
                    });
                    objIndex = selections.findIndex(_0x58dfdb => _0x58dfdb.step === x);
                    selections[objIndex].skipTo = parseInt(skipTo) - 0x1;
                    selections[objIndex].backTo = x;
                }
            }
        });
    }
    if ($(steps[x]).find(":input[type=\"radio\"]").is(":checked")) {
        selArr = [];
        $(steps).find("[data-selected]:checked").each(function(_0x46d8e4, _0xf93ac) {
            selArr.push({
                selected: $(this).data("selected")
            });
        });
        selString = [];
        selArr.forEach(_0x49e1de => selString.push(_0x49e1de.selected));
        $(steps[x]).find(".active-answer-card").find(":input[type='radio']:checked").each(function() {
            skipTo = undefined;
            if ($(this).parents("[data-skip-to]").data("skip-to")) {
                skipTo = $(this).parents("[data-skip-to]").data("skip-to");
            } else if ($(this).data("skip-to")) {
                skipTo = $(this).data("skip-to");
            }
            selections = selections.filter(_0x1951e0 => _0x1951e0.step !== x);
            if ($(this).data("go-to")) {
                answer = $(this).attr("data-go-to");
                selections.push({
                    step: x,
                    selected: answer
                });
                if (skipTo) {
                    selections = selections.filter(_0x4b33ac => _0x4b33ac.step !== skipTo - 0x2);
                    selections.push({
                        step: skipTo - 0x2,
                        selected: answer
                    });
                    objIndex = selections.findIndex(_0x1cbc06 => _0x1cbc06.step === x);
                    selections[objIndex].skipTo = parseInt(skipTo) - 0x1;
                    selections[objIndex].backTo = x;
                }
            } else if ($(this).parents("[data-go-to]").data("go-to")) {
                answer = $(this).parents("[data-go-to]").data("go-to");
                selections.push({
                    step: x,
                    selected: answer
                });
                if (skipTo) {
                    selections = selections.filter(_0x584a47 => _0x584a47.step !== skipTo - 0x2);
                    selections.push({
                        step: skipTo - 0x2,
                        selected: answer
                    });
                    objIndex = selections.findIndex(_0x202f22 => _0x202f22.step === x);
                    selections[objIndex].skipTo = parseInt(skipTo) - 0x1;
                    selections[objIndex].backTo = x;
                }
            }
        });
        if (logicExtra) {
            if (($(steps[x]).find(".active-answer-card").find("[data-radio-skip]:visible").data("radio-skip") === true || $(steps[x]).find("[data-answer][data-radio-skip]:visible").data("radio-skip") === true) && skip && selections.filter(_0x18ad13 => _0x18ad13.step === x).length > 0x0 && textareaLength === 0x0 && textInputLength === 0x0 && emailInputLength === 0x0 && checkboxInputLength === 0x0) {
                setTimeout(function() {
                    next = true;
                    back = false;
                    nextStep();
                    selectionQuiz();
                }, $(steps[x]).find("[data-radio-delay]").data("radio-delay"));
            }
        } else if ($(steps[x]).find("[data-radio-skip]:visible").data("radio-skip") === true && skip && textareaLength === 0x0 && textInputLength === 0x0 && emailInputLength === 0x0 && checkboxInputLength === 0x0) {
            setTimeout(function() {
                next = true;
                back = false;
                nextStep();
                selectionQuiz();
            }, $(steps[x]).find("[data-radio-delay]").data("radio-delay"));
        }
    }
    if (inputFilled && fileFilled && numFilled && checkboxFilled && telFilled && radioFilled && emailFilled && domainAllowed && selectFilled && textareaFilled && passwordFilled && urlFilled) {
        enableBtn();
    } else {
        disableBtn();
    }
    andLogic();
    cloneRemove();
    cloneRemoveInput();
}

function displayErrorMessage() {
    $("[data-text=\"error-message\"]").hide();
    if (unfilledArr.length > 0x0) {
        unfilledArr.forEach(function(_0x5b3da0) {
            $("input[name=\"" + _0x5b3da0.input + "\"]").siblings("[data-text=\"error-message\"]").fadeIn();
            $("input[name=\"" + _0x5b3da0.input + "\"]").parents().children("[data-text=\"error-message\"]").fadeIn();
            $("textarea[name=\"" + _0x5b3da0.input + "\"]").siblings("[data-text=\"error-message\"]").fadeIn();
            $("select[name=\"" + _0x5b3da0.input + "\"]").siblings("[data-text=\"error-message\"]").fadeIn();
        });
    }
}

function resetInputErrorMessage(_0x1365cd) {
    $("input[name=\"" + _0x1365cd + "\"]").siblings("[data-text=\"error-message\"]").hide();
    $("input[name=\"" + _0x1365cd + "\"]").parents().children("[data-text=\"error-message\"]").hide();
    $("textarea[name=\"" + _0x1365cd + "\"]").siblings("[data-text=\"error-message\"]").hide();
    $("select[name=\"" + _0x1365cd + "\"]").siblings("[data-text=\"error-message\"]").hide();
}

function increaseCurstep() {
    if (countCard) {
        curStep = curStep + 0x1;
        $("[data-text=\"total-steps\"]").text(steps.length);
    } else if ($(steps[x]).data("card")) {
        curStep = curStep + 0x0;
    } else {
        curStep = curStep + 0x1;
    }
    $("[data-text=\"current-step\"]").text(curStep);
}

function decreaseCurstep() {
    if (countCard) {
        curStep = curStep - 0x1;
        $("[data-text=\"total-steps\"]").text(steps.length);
    } else if ($(steps[x]).data("card")) {
        curStep = curStep - 0x0;
    } else {
        curStep = curStep - 0x1;
    }
    $("[data-text=\"current-step\"]").text(curStep);
}
$("[data-form=\"submit-btn\"]").on("click", function(_0x57a771) {
    if ($(this).data("redirect")) {
        redirectTo = $(this).data("redirect");
    }
    if (!$(this).data("new-tab")) {
        newTab = $(this).data("new-tab");
    }
    successCard = $(this).data("success");
    _0x57a771.preventDefault();
    _0x57a771.stopPropagation();
    if (logicExtra) {
        $(this).prop("novalidate", true);
        $(steps).find(":input").prop("required", false);
    }
    localStorage.removeItem("filledInput");
    if (fill) {
        if ($(this).data("wait")) {
            console.log($(this).data("wait"));
            $(this).text($(this).data("wait"));
        } else {
            $(this).val("Please wait...").text("Please wait...");
        }
        $("[data-form=\"multistep\"]").submit();
        if ($("div.g-recaptcha").length > 0x0 && grecaptcha.getResponse().length === 0x0) {
            form.find("[data-form=\"submit-btn\"]").text(oldSubmitText);
            form.find("[data-form=\"submit-btn\"]").val(oldSubmitText);
        }
        if (customError) {
            $("[data-text=\"error-message\"]").hide();
        }
    } else if (customError) {
        displayErrorMessage();
    }
});

function nextStep() {
    if (customError) {
        $("[data-text=\"error-message\"]").hide();
        if (fill) {
            x++;
            increaseCurstep();
            progress = x;
            if (x <= steps.length - 0x1) {
                updateStep();
                if (memory) {
                    saveFilledInput();
                }
            }
        } else {
            displayErrorMessage();
        }
    } else {
        x++;
        increaseCurstep();
        if (x > progress) {
            progress = x;
        }
        if (x <= steps.length - 0x1) {
            updateStep();
            if (memory) {
                saveFilledInput();
            }
        }
    }
    andLogic();
}

function backStep() {
    if (customError) {
        $("[data-text=\"error-message\"]").hide();
    }
    decreaseCurstep();
    if (x > 0x0) {
        $(progressbar[x]).removeClass("current");
        if (selections.filter(_0x513930 => _0x513930.skipTo === x).length > 0x0) {
            x = parseInt(getSafe(() => selections.filter(_0x3b0e17 => _0x3b0e17.skipTo === x)[0x0].backTo));
        } else {
            x--;
        }
        updateStep();
    }
    if ($(steps[x]).find("[data-radio-skip]:visible").data("radio-skip") === true || $(steps[x]).find(".active-answer-card").find("[data-radio-skip]:visible").data("radio-skip") === true || $(steps[x]).find("[data-answer][data-radio-skip]:visible").data("radio-skip") === true) {
        all_data = all_data.filter(_0x2dbc6f => _0x2dbc6f.field !== $(steps[x]).find("input[type=\"radio\"]:checked").attr("name"));
        $("[data-input-field=\"" + $(steps[x]).find("input[type=\"radio\"]:checked").attr("name") + "\"]").hide();
        $(steps[x]).find("input[type=\"radio\"]").prop("checked", false);
        $(steps[x]).find(".w-form-formradioinput").removeClass("w--redirected-checked");
        validation();
    }
}
if (weightedSelectionRange) {
    $("[data-selection]").each(function() {
        $(this).append("<div data-range=\"selection\" style=\"display:none !important\">" + $(this).data("selection") + "</div>");
    });
}

function selectionQuiz() {
    if ($(this).find("[data-btn=\"check\"]")) {
        $("[data-selection]").hide();
        $("[data-selection-weight]").hide();
        if (weightedSelection) {
            selTotal = 0x0;
            selArr.forEach(function(_0x158798) {
                selTotal = selTotal + _0x158798.selected;
            });
            $("[data-text=\"total-weight\"]").text(selTotal);
            if ($("[data-selection=\"" + selTotal + "\"]").length > 0x0) {
                $("[data-selection=\"" + selTotal + "\"]").fadeIn();
            } else if ($("[data-range]:contains(" + selTotal + ")")) {
                $("[data-range]:contains(" + selTotal + ")").parent("[data-selection]").eq(0x0).show();
            } else {
                $("[data-selection=\"other\"]").fadeIn();
            }
        } else {
            let _0x54a051 = -0x1;
            $("[data-selection]").each(function(_0x1cb0e8) {
                if ($($("[data-selection]")[_0x1cb0e8]).data("selection").includes(selString.join())) {
                    _0x54a051 = _0x1cb0e8;
                }
            });
            if (_0x54a051 > -0x1) {
                $($("[data-selection]")[_0x54a051]).fadeIn();
            } else {
                $("[data-selection=\"other\"]").fadeIn();
            }
        }
    }
}

function triggerInputAllData() {
    if (savedFilledInput && memory) {
        savedFilledInput.forEach(_0x35b0f4 => {
            var _0x32b2b2 = $("input[name=\"" + _0x35b0f4.inputName + "\"][value=\"" + _0x35b0f4.value + "\"]:not([data-prefill=\"false\"])");
            var _0x3a9def = $("input[name=\"" + _0x35b0f4.inputName + "\"]:not([data-prefill=\"false\"])");
            var _0x220977 = $("textarea[name=\"" + _0x35b0f4.inputName + "\"]:not([data-prefill=\"false\"])");
            var _0x158f11 = $("input[type=\"checkbox\"][name=\"" + _0x35b0f4.inputName + "\"]");
            var _0x1a7303 = $("input[type=\"radio\"][name=\"" + _0x35b0f4.inputName + "\"][value=\"" + _0x35b0f4.value + "\"]:not([data-prefill=\"false\"])");
            if (_0x32b2b2.attr("type") !== "file") {
                if (_0x32b2b2.attr("type") === "radio" && !_0x32b2b2.parents("[data-radio-skip]").data("radio-skip")) {
                    _0x32b2b2.click();
                    _0x32b2b2.siblings(".w-radio-input").addClass("w--redirected-checked");
                    _0x32b2b2.trigger("input");
                } else if (_0x35b0f4.value === "on") {
                    _0x3a9def.click();
                    _0x3a9def.siblings(".w-checkbox-input").addClass("w--redirected-checked");
                    _0x3a9def.trigger("input");
                } else {
                    _0x3a9def.val(_0x35b0f4.value);
                    _0x220977.val(_0x35b0f4.value);
                    $("select:not([data-prefill=\"false\"])").find("option[value=\"" + _0x35b0f4.value + "\"]").prop("selected", true);
                    _0x3a9def.trigger("input");
                    _0x3a9def.trigger("change");
                }
                const _0x3c2fa1 = _0x1a7303.data("click-addclass");
                const _0x26cad5 = _0x158f11.data("click-addclass");
                _0x1a7303.parent().addClass(_0x3c2fa1);
                _0x158f11.parent().addClass(_0x26cad5);
            }
        });
    } else if (_params) {
        getParams();
        searchQ.forEach(_0x2f278f => {
            if ($("input[name=\"" + _0x2f278f.inputName + "\"][value=\"" + _0x2f278f.value + "\"]:not([data-prefill=\"false\"])").attr("type") !== "file") {
                if ($("input[name=\"" + _0x2f278f.key + "\"][value=\"" + _0x2f278f.val + "\"]:not([data-prefill=\"false\"])").attr("type") === "radio") {
                    $("input[name=\"" + _0x2f278f.key + "\"][value=\"" + _0x2f278f.val + "\"]:not([data-prefill=\"false\"])").click();
                    $("input[name=\"" + _0x2f278f.key + "\"][value=\"" + _0x2f278f.val + "\"]:not([data-prefill=\"false\"])").siblings(".w-radio-input").addClass("w--redirected-checked");
                    $("input[name=\"" + _0x2f278f.key + "\"][value=\"" + _0x2f278f.val + "\"]:not([data-prefill=\"false\"])").trigger("input");
                } else if (_0x2f278f.val === "on") {
                    $("input[name=\"" + _0x2f278f.key + "\"]:not([data-prefill=\"false\"])").click();
                    $("input[name=\"" + _0x2f278f.key + "\"]:not([data-prefill=\"false\"])").siblings(".w-checkbox-input").addClass("w--redirected-checked");
                    $("input[name=\"" + _0x2f278f.key + "\"]").trigger("input");
                } else {
                    $("input[name=\"" + _0x2f278f.key + "\"]:not([data-prefill=\"false\"])").val(_0x2f278f.val);
                    $("textarea[name=\"" + _0x2f278f.key + "\"]:not([data-prefill=\"false\"])").val(_0x2f278f.val);
                    $("select[name=\"" + _0x2f278f.key + "\"]:not([data-prefill=\"false\"])").find("option[value=\"" + _0x2f278f.val + "\"]").prop("selected", true);
                    $("input[name=\"" + _0x2f278f.key + "\"]:not([data-prefill=\"false\"])").trigger("input");
                    $("input[name=\"" + _0x2f278f.key + "\"]:not([data-prefill=\"false\"])").trigger("change");
                }
            }
        });
    }
}
$("[data-form=\"next-btn\"]").on("click", function() {
    next = true;
    back = false;
    nextStep();
    selectionQuiz();
});
$("[data-form=\"back-btn\"]").on("click", function() {
    next = false;
    back = true;
    backStep();
});
$(steps).find(":input").not("[type=\"radio\"]").on("input", function(_0x3e3532) {
    validation();
    andLogic();
    addClickClass();
});
$(steps).find("input[type=\"radio\"]").on("click", function() {
    skip = true;
    validation();
    addClickClass();
});
if ($("[data-clickable-all]").data("clickable-all")) {
    $("[data-form=\"custom-progress-indicator\"]").removeClass("disabled");
} else {
    $("[data-form=\"custom-progress-indicator\"]").addClass("disabled");
}

function clickableIndicator() {
    if ($("[data-clickable]").data("clickable")) {
        $("[data-form=\"progress-indicator\"]").removeClass("current");
        if ($("[data-clickable]").data("clickable-all")) {
            x = $(this).index();
            updateStep();
        } else if ($(this).index() <= progress) {
            x = $(this).index();
            updateStep();
        }
    }
    $("[data-text=\"current-step\"]").text(x + 0x1);
}
$("[data-form=\"custom-progress-indicator\"]").on("click", clickableIndicator);
if ($("[data-form=\"multistep\"]").data("debug-mode")) {
    $("[data-go-to]").each(function() {
        $(this).append("<br>Data Go To = ", $(this).data("go-to"));
    });
    $("[data-answer]").each(function() {
        $(this).append("<br>Data Answer = ", $(this).data("answer"));
    });
}

function resetFormly() {
    $("[data-form=\"multistep\"]").trigger("reset");
    $("[data-form=\"multistep\"]").parents().find(".w-form-done").hide();
    x = 0x0;
    updateStep();
    $("[data-form=\"multistep\"]").show();
    $("[data-form=\"submit-btn\"]").text(oldSubmitText);
    $("[data-form=\"submit-btn\"]").val(oldSubmitText);
    $("[data-text=\"current-step\"]").text(0x1);
    $("[data-form=\"multistep\"]").find("input:checkbox").siblings(".w-checkbox-input").removeClass("w--redirected-checked");
}
$(document).ajaxComplete(function(_0x5cfce5, _0x2f986, _0x3bc18f) {
    if (_0x3bc18f.url.includes("https://webflow.com/api/v1/form/")) {
        const _0x4e615b = _0x2f986.status === 0xc8;
        if (redirectTo && _0x4e615b) {
            if (newTab) {
                window.open(redirectTo, "_blank");
            } else {
                setTimeout(() => {
                    location.href = redirectTo;
                }, redirectDelay);
            }
        }
        if (_0x4e615b && successCard !== "") {
            $("[data-success-card=\"" + successCard + "\"]").fadeIn();
        }
        if (_0x4e615b && formReset) {
            setTimeout(() => {
                resetFormly();
            }, resetDelay);
        }
        if (!_0x4e615b) {
            $("[data-form=\"submit-btn\"]").val("Please wait...");
            $("[data-form=\"submit-btn\"]").text("Please wait...");
        }
    }
});
$("[data-btn=\"edit\"]").on("click", function() {
    var _0x33cbb3 = $(this).parent().find("[data-input-field]").data("input-field");
    setTimeout(function() {
        $("input[name=\"" + _0x33cbb3 + "\"]").focus();
    }, 0x64);
    back = true;
    x = $(this).data("edit-step") - 0x1;
    updateStep();
    if (countCard) {
        curStep = x + 0x1;
        $("[data-text=\"total-steps\"]").text(steps.length);
    } else if ($(steps[x]).data("card")) {
        curStep = x + 0x0;
    } else {
        curStep = x + 0x1;
    }
    $("[data-text=\"current-step\"]").text(curStep);
    back = false;
});
$("[data-btn=\"reset\"]").on("click", function() {
    $("[data-form=\"multistep\"]").trigger("reset");
    let _0x20f800 = $(this);
    $(this).text("Please wait...");
    setTimeout(function() {
        $(_0x20f800).text(oldResetText);
        $(_0x20f800).parents(".w-form-done").hide();
        x = 0x0;
        updateStep();
        $("[data-form=\"multistep\"]").show();
        $("[data-form=\"submit-btn\"]").text(oldSubmitText);
        $("[data-form=\"submit-btn\"]").val(oldSubmitText);
        $(_0x20f800).val(oldSubmitText);
        $("[data-text=\"current-step\"]").text(0x1);
        $("[data-form=\"multistep\"]").find("input:checkbox").siblings(".w-checkbox-input").removeClass("w--redirected-checked");
    }, resetDelay);
});
$("body").on("keypress", function(_0x1f9e8f) {
    if (_0x1f9e8f.keyCode === 0xd) {
        _0x1f9e8f.preventDefault();
        _0x1f9e8f.stopPropagation();
        if ($(steps[x]).find("textarea").is(":focus")) {
            $(steps[x]).find("textarea:focus").val($(steps[x]).find("textarea:focus").val() + "\n");
        } else if ($("[data-enter]").data("enter") && fill && totalSteps > curStep) {
            $("[data-form=\"next-btn\"]")[0x0].click();
        }
    }
});
$("body").keydown(function(_0x3e4393) {
    if ((_0x3e4393.metaKey || _0x3e4393.ctrlKey) && _0x3e4393.keyCode == 0xd) {
        if (x >= steps.length - 0x1 && fill) {
            $(steps[x]).find("[data-form=\"submit-btn\"]:visible").click();
        } else {
            _0x3e4393.preventDefault();
            _0x3e4393.stopPropagation();
        }
    }
});
$("[data-form=\"multistep\"]").find(":input").on("change", function() {
    all_data = all_data.filter(_0x9f27c8 => _0x9f27c8.field !== $(this).attr("name"));
    if ($(this).attr("type") === "checkbox") {
        if ($(this).is(":checked")) {
            all_data.push({
                field: $(this).attr("name"),
                value: $(this).siblings("span").text()
            });
        } else {
            $("[data-input-field=\"" + $(this).attr("name") + "\"]").hide();
        }
    } else {
        all_data.push({
            field: $(this).attr("name"),
            value: $(this).val()
        });
        if ($(this).val() !== "") {
            resetInputErrorMessage($(this).attr("name"));
        }
    }
    all_data.forEach(function(_0x2d5c77) {
        $("[data-input-field=\"" + _0x2d5c77.field + "\"]").show();
        $("[data-input-field=\"" + _0x2d5c77.field + "\"]").text(_0x2d5c77.value);
    });
});
$("[data-form=\"multistep\"]").find("textarea").on("change", function() {
    if ($(this).val() !== "") {
        resetInputErrorMessage($(this).attr("name"));
    }
    all_data = all_data.filter(_0xd28222 => _0xd28222.field !== $(this).attr("name"));
    all_data.push({
        field: $(this).attr("name"),
        value: $(this).val()
    });
    all_data.forEach(function(_0x4ddc57) {
        $("[data-input-field=\"" + _0x4ddc57.field + "\"]").show();
        $("[data-input-field=\"" + _0x4ddc57.field + "\"]").text(_0x4ddc57.value);
    });
});
$("[data-form=\"multistep\"]").find("select").on("change", function() {
    if ($(this).val() !== "") {
        resetInputErrorMessage($(this).attr("name"));
    }
    var _0x39cf4e = $(this).data("ms-field");
    all_data = all_data.filter(_0x4236be => _0x4236be.field !== $(this).attr("name"));
    all_data.push({
        field: $(this).attr("name"),
        value: _0x39cf4e ? $(this).find("option[value=\"$(this).val()\"]").text() : $(this).val()
    });
    all_data.forEach(function(_0x14f1ef) {
        $("[data-input-field=\"" + _0x14f1ef.field + "\"]").show();
        $("[data-input-field=\"" + _0x14f1ef.field + "\"]").text(_0x14f1ef.value);
    });
});
updateStep();
triggerInputAllData();
$("[data-cms-select=cms]").each(function() {
    const _0x2c0ad7 = $(this).find("[data-cms-select=text]");
    const _0x1ea96d = [];
    _0x2c0ad7.each(function() {
        _0x1ea96d.push($(this).text().trim());
    });
    const _0x25b0ba = $(this).siblings("[data-cms-select=input]");
    $.each(_0x1ea96d, function(_0x6643f5, _0x158a9b) {
        const _0x397470 = $("<option>").val(_0x158a9b).text(_0x158a9b);
        _0x25b0ba.append(_0x397470);
    });
});

function cloneRemove() {
    $("[data-clone-wrapper]").each(function() {
        if ($(this).find("[data-clone]").length < 0x2) {
            $(this).find("[data-form=\"remove-clone\"]").hide();
        } else {
            $(this).find("[data-form=\"remove-clone\"]").show();
        }
    });
}

function cloneRemoveInput() {
    $("[data-clone-input-wrapper]").each(function() {
        console.log($(this).find("[data-clone-input]").length);
        if ($(this).find("[data-clone-input]").length < 0x2) {
            $(this).find("[data-form=\"remove-input-clone\"]").hide();
        } else {
            $(this).find("[data-form=\"remove-input-clone\"]").show();
        }
    });
}
$("[data-form=\"remove-clone\"]").on("click", function() {
    const _0x279727 = $(this).parents("[data-clone]").length > 0x0 ? $(this).parents("[data-clone]").index() : $(this).parents("[data-display]").index();
    const _0x37c1ce = $(this).parents("[data-clone]").length > 0x0 ? $(this).parents("[data-clone]").data("clone") : $(this).parents("[data-display]").data("display");
    $("[data-clone=\"" + _0x37c1ce + "\"]").eq(_0x279727).remove();
    $("[data-display=\"" + _0x37c1ce + "\"]").eq(_0x279727).remove();
    cloneRemove();
    let _0xe4cd11 = $("[data-add-new=\"" + _0x37c1ce + "\"]").data("add-new-limit");
    let _0x133935 = $("[data-clone=\"" + _0x37c1ce + "\"]").length;
    console.log(_0x133935, _0xe4cd11);
    if (_0x133935 < _0xe4cd11) {
        console.log("show");
        $("[data-add-new=\"" + _0x37c1ce + "\"]").show();
    }
    validation();
});
$("[data-form=\"remove-input-clone\"]").on("click", function() {
    let _0x3dc2c3 = $(this).siblings().attr("name");
    let _0x1029a6 = $(this).parents("[data-clone-input]").data("clone-input");
    $(this).parent("[data-clone-input]").remove();
    $("[data-input-field=\"" + _0x3dc2c3 + "\"]").parent("[data-display-input]").remove();
    let _0x4df942 = $("[data-add-new-input=\"" + _0x1029a6 + "\"]").data("add-new-input-limit");
    let _0x28a2cd = $("[data-clone-input=\"" + _0x1029a6 + "\"]").length;
    if (_0x28a2cd < _0x4df942) {
        $("[data-add-new-input=\"" + _0x1029a6 + "\"]").show();
    }
    validation();
});
$("[data-add-new]").on("click", function() {
    let _0xc0e435 = $(this).data("add-new");
    let _0x400891 = $(this).data("add-new-limit");
    var _0x370119 = $("[data-clone=\"" + _0xc0e435 + "\"]").eq(0x0).clone(true);
    var _0x5af4a7 = $("[data-display=\"" + _0xc0e435 + "\"]").eq(0x0).clone(true);
    let _0x456144 = "";
    $(this).find("[data-form=\"remove-clone\"]").show();
    cloneRemove();
    _0x370119.find("[data-clone-input]").find("input").val("");
    _0x370119.find("[data-clone-input]").find("select").val("");
    _0x370119.find("[data-clone-input]").find("textarea").val("");
    _0x370119.find("[data-clone-input]").not(":first").remove();
    _0x370119.find("[data-clone-input]").find("[aria-label=\"Remove file\"]").click();
    _0x5af4a7.find("[data-display-input]").not(":first").remove();
    _0x370119.find("input").each(function() {
        if ($(this).closest("[data-clone-input]").length > 0x0) {
            let _0x546124 = 0x0;
            const _0x28a766 = $(this).closest("[data-clone-input]").data("clone-input");
            $("[data-clone-input=\"" + _0x28a766 + "\"] input").each(function() {
                const _0x85373f = $(this).attr("name");
                if (_0x85373f && _0x85373f.startsWith("relationship-")) {
                    const _0x3e4e61 = parseInt(_0x85373f.split("-")[0x1]);
                    if (!isNaN(_0x3e4e61) && _0x3e4e61 > _0x546124) {
                        _0x546124 = _0x3e4e61;
                    }
                }
            });
            _0x546124++;
            _0x456144 = this.name + "-" + _0x546124;
        } else {
            _0x456144 = this.name + "-" + (parseInt($("[data-clone=\"" + _0xc0e435 + "\"]").last().index()) + 0x1);
        }
        $(this).val("");
        $(this).attr("name", _0x456144);
        $(this).attr("data-name", _0x456144);
    });
    _0x370119.find("textarea").each(function() {
        if ($(this).closest("[data-clone-input]").length > 0x0) {
            let _0x14c012 = 0x0;
            const _0x384048 = $(this).closest("[data-clone-input]").data("clone-input");
            $("[data-clone-input=\"" + _0x384048 + "\"] textarea").each(function() {
                const _0x2d3c64 = $(this).attr("name");
                if (_0x2d3c64 && _0x2d3c64.startsWith("relationship-")) {
                    const _0x1ee99c = parseInt(_0x2d3c64.split("-")[0x1]);
                    if (!isNaN(_0x1ee99c) && _0x1ee99c > _0x14c012) {
                        _0x14c012 = _0x1ee99c;
                    }
                }
            });
            _0x14c012++;
            _0x456144 = this.name + "-" + _0x14c012;
        } else {
            _0x456144 = this.name + "-" + (parseInt($("[data-clone=\"" + _0xc0e435 + "\"]").last().index()) + 0x1);
        }
        $(this).val("");
        $(this).attr("name", _0x456144);
        $(this).attr("data-name", _0x456144);
    });
    _0x370119.find("select").each(function() {
        if ($(this).closest("[data-clone-input]").length > 0x0) {
            let _0x37d0e6 = 0x0;
            const _0x4ab55a = $(this).closest("[data-clone-input]").data("clone-input");
            $("[data-clone-input=\"" + _0x4ab55a + "\"] select").each(function() {
                const _0x5a3cf5 = $(this).attr("name");
                if (_0x5a3cf5 && _0x5a3cf5.startsWith("relationship-")) {
                    const _0x392761 = parseInt(_0x5a3cf5.split("-")[0x1]);
                    if (!isNaN(_0x392761) && _0x392761 > _0x37d0e6) {
                        _0x37d0e6 = _0x392761;
                    }
                }
            });
            _0x37d0e6++;
            _0x456144 = this.name + "-" + _0x37d0e6;
        } else {
            _0x456144 = this.name + "-" + (parseInt($("[data-clone=\"" + _0xc0e435 + "\"]").last().index()) + 0x1);
        }
        $(this).val("");
        $(this).attr("name", _0x456144);
        $(this).attr("data-name", _0x456144);
    });
    _0x5af4a7.find("[data-input-field]").each(function() {
        if ($(this).data("input-field")) {
            let _0x3d6370 = 0x0;
            const _0x51d13f = $(this).data("input-field").split("-")[0x0];
            $("[data-display=\"" + _0xc0e435 + "\"] [data-input-field^=\"" + _0x51d13f + "\"]").each(function() {
                const _0xb8f2b6 = $(this).attr("data-input-field");
                const _0x302282 = parseInt(_0xb8f2b6.split("-")[0x1]);
                if (!isNaN(_0x302282) && _0x302282 > _0x3d6370) {
                    _0x3d6370 = _0x302282;
                }
            });
            _0x3d6370++;
            const _0x1c6e69 = _0x51d13f + "-" + _0x3d6370;
            $(this).attr("data-input-field", _0x1c6e69);
        }
    });
    $("[data-clone-wrapper=\"" + _0xc0e435 + "\"]").append(_0x370119);
    $("[data-display-wrapper=\"" + _0xc0e435 + "\"]").append(_0x5af4a7);
    $("[data-index=\"" + _0xc0e435 + "\"]").each(function() {
        $(this).text($(this).parents("[data-clone=\"" + _0xc0e435 + "\"]").index() + 0x1);
    });
    $("[data-display-index=\"" + _0xc0e435 + "\"]").each(function() {
        $(this).text($(this).parents("[data-display=\"" + _0xc0e435 + "\"]").index() + 0x1);
    });
    let _0xc43965 = $("[data-clone-wrapper=\"" + _0xc0e435 + "\"] [data-clone=\"" + _0xc0e435 + "\"]").length;
    if (_0xc43965 >= _0x400891) {
        $(this).hide();
        return;
    }
    $(this).show();
    validation();
});
$("[data-add-new-input]").on("click", function() {
    const _0xff6f05 = $(this).parents("[data-clone]").index();
    let _0x454d24 = $(this).data("add-new-input");
    var _0x3b3805 = $("[data-clone-input=\"" + _0x454d24 + "\"]").eq(0x0).clone(true);
    var _0x2f70bb = $("[data-display-input=\"" + _0x454d24 + "\"]").eq(0x0).clone(true);
    let _0x3e8396 = $(this).data("add-new-input-limit");
    let _0x53f6fb = 0x0;
    $("[data-clone-input=\"" + _0x454d24 + "\"] input").each(function() {
        const _0x147e5d = $(this).attr("name");
        if (_0x147e5d) {
            const _0x72d6ab = parseInt(_0x147e5d.split("-")[0x1]);
            if (!isNaN(_0x72d6ab) && _0x72d6ab > _0x53f6fb) {
                _0x53f6fb = _0x72d6ab;
            }
        }
    });
    $("[data-clone-input=\"" + _0x454d24 + "\"] select").each(function() {
        const _0x28c47a = $(this).attr("name");
        if (_0x28c47a) {
            const _0x2ed30d = parseInt(_0x28c47a.split("-")[0x1]);
            if (!isNaN(_0x2ed30d) && _0x2ed30d > _0x53f6fb) {
                _0x53f6fb = _0x2ed30d;
            }
        }
    });
    $("[data-clone-input=\"" + _0x454d24 + "\"] textarea").each(function() {
        const _0xca55e5 = $(this).attr("name");
        if (_0xca55e5) {
            const _0x367d06 = parseInt(_0xca55e5.split("-")[0x1]);
            if (!isNaN(_0x367d06) && _0x367d06 > _0x53f6fb) {
                _0x53f6fb = _0x367d06;
            }
        }
    });
    _0x53f6fb++;
    _0x3b3805.find("input").each(function() {
        const _0x9e573d = $(this).attr("name");
        let _0x299299 = _0x9e573d + "-" + _0x53f6fb;
        $(this).val("");
        $(this).attr("name", _0x299299);
        $(this).attr("data-name", _0x299299);
    });
    _0x3b3805.find("select").each(function() {
        const _0x5c56f0 = $(this).attr("name");
        let _0x474ead = _0x5c56f0 + "-" + _0x53f6fb;
        $(this).val("");
        $(this).attr("name", _0x474ead);
        $(this).attr("data-name", _0x474ead);
    });
    _0x3b3805.find("textarea").each(function() {
        const _0x32347e = $(this).attr("name");
        let _0x597418 = _0x32347e + "-" + _0x53f6fb;
        $(this).val("");
        $(this).attr("name", _0x597418);
        $(this).attr("data-name", _0x597418);
    });
    _0x2f70bb.find("[data-input-field]").each(function() {
        $(this).attr("data-input-field", "relationship-" + _0x53f6fb);
    });
    $(this).siblings("[data-clone-input-wrapper=\"" + _0x454d24 + "\"]").append(_0x3b3805);
    $("[data-display]").eq(_0xff6f05).find("[data-display-input-wrapper=\"" + _0x454d24 + "\"]").append(_0x2f70bb);
    $("[data-input-index=\"" + _0x454d24 + "\"]").each(function() {
        $(this).text($(this).parents("[data-clone-input=\"" + _0x454d24 + "\"]").index() + 0x1);
    });
    $("[data-display-input-index=\"" + _0x454d24 + "\"]").each(function() {
        $(this).text($(this).parents("[data-display-input=\"" + _0x454d24 + "\"]").index() + 0x1);
    });
    let _0x4e33eb = $("[data-clone-input-wrapper=\"" + _0x454d24 + "\"] [data-clone-input=\"" + _0x454d24 + "\"]").length;
    if (_0x4e33eb >= _0x3e8396) {
        $(this).hide();
        return;
    }
    $(this).show();
    cloneRemoveInput();
    validation();
});
$("[data-remove-upload]").on("click", function() {
    const _0x58ae1b = $(this).data("remove-upload");
    $("input[name=\"" + _0x58ae1b + "\"]").val("");
    validation();
});

function andLogic() {
    if (conditionalResult) {
        steps.eq(x).find("[data-show-if]").hide();
        steps.eq(x).find("[data-show-if]").each(function() {
            function _0x24ef2b(_0x4e7ea1) {
                const _0x545064 = _0x4e7ea1.split("&");
                const _0x23c37e = [];
                _0x545064.forEach(_0x297c9d => {
                    const [_0x3439b5, _0x33533a] = _0x297c9d.split("=");
                    _0x23c37e.push({
                        field: _0x3439b5,
                        value: _0x33533a
                    });
                });
                return _0x23c37e;
            }
            const _0x5b7c67 = $(this).attr("data-show-if");
            const _0x8db5d9 = _0x24ef2b(_0x5b7c67);

            function _0x5839ca(_0x3f49ec, _0x525fab) {
                return _0x525fab.some((_0x34b0d3, _0x3bbff7) => {
                    if (_0x3f49ec[0x0] && _0x34b0d3.field === _0x3f49ec[0x0].field) {
                        return _0x3f49ec.every((_0x575dde, _0x5b7b97) => _0x525fab[_0x3bbff7 + _0x5b7b97] && _0x525fab[_0x3bbff7 + _0x5b7b97].field === _0x575dde.field && _0x525fab[_0x3bbff7 + _0x5b7b97].value === _0x575dde.value);
                    }
                    return false;
                });
            }
            const _0x156b45 = _0x5839ca(_0x8db5d9, all_data);
            if (_0x156b45) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
}
$("[data-progressive-target]").addClass("hide");
$("[data-progressive-input]").on("input", function() {
    const _0x493b14 = $(this).data("progressive-input");
    const _0x20612f = $(this).val();
    const _0x41183b = $("[data-progressive-target=\"" + _0x493b14 + "\"]").data("progressive-input-value");
    let _0x214336 = $("[data-progressive-target=\"" + _0x493b14 + "\"][data-progressive-input-value=\"" + _0x20612f + "\"]");
    let _0x3ec97a = $("[data-progressive-target=\"" + _0x493b14 + "\"][data-progressive-input-value=\"*\"]");
    $("[data-progressive-target=\"" + _0x493b14 + "\"]").addClass("f-hide");
    $("[data-progressive-target=\"" + _0x493b14 + "\"]").removeClass("f-show");
    if (_0x20612f !== "") {
        if (_0x41183b === "*" && _0x20612f !== "") {
            _0x3ec97a.removeClass("f-hide");
            _0x3ec97a.addClass("f-show");
        } else {
            _0x214336.removeClass("f-hide");
            _0x214336.addClass("f-show");
        }
    }

    function _0xe7c411(_0x5b92ac) {
        if (_0x5b92ac && $("[data-progressive-input=\"" + _0x5b92ac + "\"]").val() !== "") {
            $("[data-progressive-input=\"" + _0x5b92ac + "\"]").trigger("input");
        }
    }
    let _0x4f4ec9 = $("[data-progressive-target=\"" + _0x493b14 + "\"]").find("[data-progressive-input]").data("progressive-input");
    _0xe7c411(_0x4f4ec9);
    $("[data-progressive-input]:not(:visible)").each(function() {
        const _0x5878dd = $(this).data("progressive-input");
        $("[data-progressive-target=\"" + _0x5878dd + "\"]").removeClass("f-show");
        $("[data-progressive-target=\"" + _0x5878dd + "\"]").addClass("f-hide");
    });
});

function addClickClass() {
    const _0x344fdc = $(this).data("click-addclass");
    const _0x36b84e = $(this).attr("name");
    $("input[name=\"" + _0x36b84e + "\"]").parent().removeClass(_0x344fdc);
    if ($(this).is(":checked")) {
        $(this).parent().addClass(_0x344fdc);
    }
}
$("[data-click-addclass]").on("change", addClickClass);

function updateCounter(_0x4f2cd2) {
    var _0x783b89 = new Date();
    var _0x213abd = _0x783b89.getMonth();
    var _0x7465c2 = btoa("counter");
    var _0x49f8f4 = btoa(_0x213abd.toString());
    var _0x38313c = getCookie(_0x7465c2);
    if (!_0x38313c || _0x38313c !== _0x49f8f4) {
        $.post("https://videsigns-staging.co.uk/counter", function() {
            console.log("Counter updated successfully.");
            document.cookie = _0x7465c2 + "=" + _0x49f8f4;
        }).fail(function(_0x47e251, _0x5522e4, _0x189342) {
            console.error("Failed to update counter:", _0x189342);
        });
    } else {
        console.log("Counter already updated for this month.");
    }
}

function getCookie(_0x509b52) {
    var _0x2cccbe = null;
    if (document.cookie && document.cookie !== "") {
        var _0x2e736b = document.cookie.split(";");
        for (var _0x99b4f4 = 0x0; _0x99b4f4 < _0x2e736b.length; _0x99b4f4++) {
            var _0x18a968 = _0x2e736b[_0x99b4f4].trim();
            if (_0x18a968.substring(0x0, _0x509b52.length + 0x1) === _0x509b52 + "=") {
                _0x2cccbe = decodeURIComponent(_0x18a968.substring(_0x509b52.length + 0x1));
                break;
            }
        }
    }
    return _0x2cccbe;
}
updateCounter();
scrollTop();
cloneRemove();
cloneRemoveInput();
const formlyUrlParams = new URLSearchParams(window.location.search);
const formlySupportParam = formlyUrlParams.get("formly-support");
const showButton = formlySupportParam === "true";
let scriptLocation = "head";
let isMultistepAttributePresent = true;
let isMultistepOnFormElement = true;
let areButtonsPresent = true;
let isNextBtnOnSubmit = false;
let isSubmitBtnOnSubmit = true;
let isBackBtnOnSubmit = false;
let formType = logicExtra ? "FormlyLogic enabled" : "Basic (No Formly Logic)";
let resultStatus = "PASS";
let scriptSrcAdded = "";

function isElementPresent(_0x55fb8f, _0x24675f) {
    return document.querySelector("[" + _0x24675f + "=\"" + _0x55fb8f + "\"]") !== null;
}
isMultistepAttributePresent = document.querySelector("[data-form=\"multistep\"]") !== null;
const multistepForm = document.querySelector("form[data-form=\"multistep\"]");
const formStepLength = multistepForm.querySelectorAll("[data-form=\"step\"]").length;
isMultistepOnFormElement = multistepForm !== null;
const multistepContainer = document.querySelector("[data-form=\"multistep\"]");
const nextBtnExist = multistepContainer.querySelector("[data-form=\"next-btn\"]");
const backBtnExist = multistepContainer.querySelector("[data-form=\"back-btn\"]");
const submitBtnExist = multistepContainer.querySelector("[data-form=\"submit-btn\"]");
areButtonsPresent = nextBtnExist !== null && backBtnExist !== null && submitBtnExist !== null;
isNextBtnOnSubmit = nextBtnExist && nextBtnExist.tagName.toLowerCase() === "input";
isSubmitBtnOnSubmit = submitBtnExist && submitBtnExist.tagName.toLowerCase() === "input" && submitBtnExist.type.toLowerCase() === "submit";
isBackBtnOnSubmit = backBtnExist && backBtnExist.tagName.toLowerCase() === "input";
const checkPowerup = _0xfbf0d6 => document.querySelector(_0xfbf0d6) !== null;
const progressBarAttr = document.querySelector("[data-form=\"progress\"]") !== null;
const progressIndicatorAttr = document.querySelector("[data-form=\"progress-indicator\"]") !== null;
const customProgressAttr = document.querySelector("[data-form=\"progress-indicator\"]") !== null;
const cardDivAttr = document.querySelector("[data-card=\"true\"]") !== null;
const currentStepAttr = document.querySelector("[data-text=\"current-step\"]") !== null;
const totalStepAttr = document.querySelector("[data-text=\"total-steps\"]") !== null;
const enterAttr = document.querySelector("[data-enter=\"true\"]") !== null;
const submitAttr = document.querySelector("[data-submit=\"true\"]") !== null;
const radioSkipAttr = document.querySelector("[data-radio-skip=\"true\"]") !== null;
const customCheckboxAttr = document.querySelector("[data-checkbox]") !== null;
const recapatchaAttr = document.querySelector("[data-callback=\"recaptcha\"]") !== null;
if (false || scriptLocation !== "head" || !isMultistepAttributePresent || !isMultistepOnFormElement || !areButtonsPresent || isNextBtnOnSubmit || !isSubmitBtnOnSubmit || isBackBtnOnSubmit) {
    resultStatus = "FAIL";
}

function isScriptUrlMatch(_0x50aa86, _0x43754c) {
    for (var _0x52c74 = 0x0; _0x52c74 < _0x43754c.length; _0x52c74++) {
        if (_0x50aa86.includes(_0x43754c[_0x52c74])) {
            return true;
        }
    }
    return false;
}
var keywordsToCheck = ["videsigns", "formly"];
var scripts = document.getElementsByTagName("script");
var matchedScripts = [];
for (var i = 0x0; i < scripts.length; i++) {
    var scriptSrcs = scripts[i].src;
    if (isScriptUrlMatch(scriptSrcs, keywordsToCheck)) {
        matchedScripts.push(scriptSrcs);
    }
}
if (matchedScripts.length > 0x0) {
    scriptSrcAdded = matchedScripts;
    const script = document.querySelector("script[src=\"" + scriptSrcAdded + "\"]");
    if (script) {
        scriptLocation = script.parentNode.tagName === "BODY" ? "Before &lt;/body&gt; tag" : "Inside <head> tag";
    }
} else {
    scriptSrcAdded = "No Formly script added to the page!<span class=\"f-icon-embed-xxsmall-2 w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--carbon\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path fill=\"currentColor\" d=\"M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z\"></path></svg></span>";
}
const newElement = document.createElement("div");
const newStyle = document.createElement("style");
newStyle.innerHTML = "\n  .f-icon-embed-xxsmall-2 {\n    width: 1.3rem !important;\n    height: 1.3rem !important;\n    color: #ff3232 !important;\n    flex-direction: column !important;\n    justify-content: center !important;\n    align-items: center !important;\n    display: flex !important;\n  }\n  .f-icon-embed-xxsmall {\n    width: 1.3rem !important;\n    height: 1.3rem !important;\n    color: #57ff4b !important;\n    flex-direction: column !important;\n    justify-content: center !important;\n    align-items: center !important;\n    display: flex !important;\n  }\n\n  .f-sidenav {\n    height: 100% !important;\n    width: 0;\n    position: fixed !important;\n    z-index: 999999999999 !important;\n    top: 0;\n    left: 0;\n    background-color: #081019 !important;\n    overflow-x: hidden !important;\n    padding-top: 60px !important;\n    transition: 0.5s !important;\n    font-size: 15px !important;\n    color: rgba(255, 255, 255, .73) !important;\n    font-family:system-ui !important;\n  }\n\n  .f-section-title-text, .f-support-text, .f-openbtn{\n    font-size: 15px !important;\n    color: rgba(255, 255, 255, .73);\n    font-family:system-ui !important;\n  }\n\n  .f-sidenav p, .f-sidenav strong {\n    display: flex !important;\n    justify-content: space-between !important;\n    margin-bottom: 4px !important;\n    color: rgba(255, 255, 255, .73);\n  }\n\n  .f-sidenav .f-closebtn {\n    position: absolute !important;\n    top: 25px !important;\n    right: 25px !important;\n    font-size: 36px !important;\n    margin-left: 50px !important;\n    text-decoration: none !important;\n    color: #e7e7e7 !important;\n  }\n\n  .f-fc-core-setup {\n    padding: 12px !important;\n    margin-bottom: 11px !important;\n    border-radius: 6px !important;\n  }\n\n  #f-main {\n    transition: margin-left .5s !important;\n    padding: 20px !important;\n  }\n\n  .f-fc-main-content {\n    transition: margin-left .5s !important;\n    padding: 20px !important;\n  }\n\n  .f-fc-form-step {\n    padding-left: 10px !important;\n  }\n\n  .f-openbtn {\n    white-space: nowrap !important;\n    cursor: pointer !important;\n    box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 1px 3px rgba(0, 0, 0, .1) !important;\n    visibility: visible !important;\n    z-index: 99 !important;\n    color: #e7e7e7 !important;\n    opacity: 1 !important;\n    width: auto !important;\n    height: auto !important;\n    background-color: #1e1e1e !important;\n    border-radius: 3px !important;\n    margin: 0 !important;\n    padding: 6px !important;\n    font-size: 13px !important;\n    line-height: 14px !important;\n    text-decoration: none !important;\n    display: flex !important;\n    position: fixed !important;\n    top: auto !important;\n    bottom: 12px !important;\n    left: 12px !important;\n    right: auto !important;\n    overflow: visible !important;\n    transform: none !important;\n    align-items: center !important;\n  }\n\n  .f-text-header{\n    color: #fff !important;\n    font-size: 1.8rem !important;\n    font-weight: 600 !important;\n    line-height: 1.2 !important;\n    margin-bottom:4px\n  }\n\n  @media screen and (max-height: 450px) {\n    .sidenav { padding-top: 15px !important; }\n    .sidenav a { font-size: 18px !important; }\n  }\n\n  .f-section-title-text{\n    color: #fff !important;\n    margin-bottom: 10px !important;\n    font-size: 18px !important;\n    font-weight: 700 !important;\n  }\n\n  .f-div-support-section{\n    padding-top:1rem !important;\n    padding-bottom:1rem !important;\n  }\n\n  .f-text-white{\n    color: white !important;\n  }\n\n  .f-spacer{\n    padding-top:8px !important;\n  }\n";
document.head.appendChild(newStyle);
if (showButton) {
    document.body.appendChild(newElement);
}
newElement.innerHTML = "\n  <button class=\"f-openbtn\" onclick=\"openNav()\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"20px\" height=\"20px\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\">\n      <path fill=\"currentColor\" d=\"M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21\"></path>\n    </svg> Check Form\n  </button>\n  <div id=\"f-mySidenav\" class=\"f-sidenav\">\n    <a href=\"javascript:void(0)\" class=\"f-closebtn\" onclick=\"closeNav()\">&times;</a>\n    <div class=\"f-fc-main-content\">\n      <h4 class=\"f-text-header\">Formly Support</h4>\n      <p class=\"f-support-text\">\n        If you have spotted a bug or require extra support, please reach out to us via Slack or email us at developer@videsigns.uk.\n      </p>\n\n      <div class=\"f-div-support-section\">\n        <p class=\"f-section-title-text\">Form Type</p>\n        <p class=\"f-support-text\">" + formType + "</p>\n      </div>\n\n      <div class=\"f-div-support-section\">\n        <p class=\"f-section-title-text\">Formly Script Info</p>\n        <strong class=\"f-text-white\">Script URL:</strong>\n        <p class=\"f-support-text\">" + scriptSrcAdded + "</p>\n        <div class=\"f-spacer\"></div>\n        <strong class=\"f-text-white\">Script Location:</strong>\n        <p class=\"f-support-text\">" + scriptLocation + "</p>\n      </div>\n\n      <div class=\"f-div-support-section\">\n        <p class=\"f-section-title-text\">Attributes</p>\n        <strong class=\"f-text-white\">1. Form: data-form=multistep " + (isMultistepOnFormElement ? "<span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span>" : "<span class=\"f-icon-embed-xxsmall-2 w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--carbon\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path fill=\"currentColor\" d=\"M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z\"></path></svg></span>") + "</strong>\n        <p class=\"f-support-text\">Multistep form attribute is on Form element and not on Form Block element\n        </p>\n        <div class=\"f-spacer\"></div>\n\n        <strong class=\"f-text-white\">2. Form Steps: data-form=step\n        " + (formStepLength > 0x0 ? "<span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span>" : "<span class=\"f-icon-embed-xxsmall-2 w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--carbon\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path fill=\"currentColor\" d=\"M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z\"></path></svg></span>") + "</strong>\n        <p class=\"f-support-text\">Number of steps: " + formStepLength + "</p>\n        <div class=\"f-spacer\"></div>\n\n        <strong class=\"f-text-white\">3. Next Buttons: data-form=back-btn</strong>\n        <p class=\"f-support-text\">Next button present? " + (nextBtnExist ? "<span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span>" : "<span class=\"f-icon-embed-xxsmall-2 w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--carbon\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path fill=\"currentColor\" d=\"M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z\"></path></svg></span>") + "</p>\n        <p class=\"f-support-text\">Next button attribute is NOT on Form Submit Button " + (isNextBtnOnSubmit ? "<span class=\"f-icon-embed-xxsmall-2 w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--carbon\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path fill=\"currentColor\" d=\"M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z\"></path></svg></span>" : "<span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span>") + "</p>\n        <div class=\"f-spacer\"></div>\n\n        <strong class=\"f-text-white\">4. Back Buttons: data-form=next-btn</strong>\n        <p class=\"f-support-text\">Back button present? " + (backBtnExist ? "<span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span>" : "<span class=\"f-icon-embed-xxsmall-2 w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--carbon\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path fill=\"currentColor\" d=\"M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z\"></path></svg></span>") + "</p>\n        <p class=\"f-support-text\">Back button attribute is NOT on Form Submit Button" + (isBackBtnOnSubmit ? "<span class=\"f-icon-embed-xxsmall-2 w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--carbon\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path fill=\"currentColor\" d=\"M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z\"></path></svg></span>" : "<span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span>") + "</p>\n        <div class=\"f-spacer\"></div>\n\n        <strong class=\"f-text-white\">5. Submit Buttons: data-form=next-btn</strong>\n        <p class=\"f-support-text\">Submit button present? " + (backBtnExist ? "<span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span>" : "<span class=\"f-icon-embed-xxsmall-2 w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--carbon\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path fill=\"currentColor\" d=\"M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z\"></path></svg></span>") + "</p>\n        <p class=\"f-support-text\">Submit button attribute IS on Form Submit Button\n        " + (isSubmitBtnOnSubmit ? "<span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span>" : "<span class=\"f-icon-embed-xxsmall-2 w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--carbon\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path fill=\"currentColor\" d=\"M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z\"></path></svg></span>") + "</p>\n        <div class=\"f-spacer\"></div>\n      </div>\n\n      <div class=\"f-div-support-section\">\n        <p class=\"f-section-title-text\">Powerups</p>\n        " + (progressBarAttr && progressIndicatorAttr ? "<strong class=\"f-text-white\">Automatic Progress Indicators <span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span></strong>" : "") + "\n        " + (customProgressAttr ? "<strong class=\"f-text-white\">Custom Progress Indicators <span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span></strong>" : "") + "\n        " + (cardDivAttr ? "<strong class=\"f-text-white\">Intro Cards Or Steps Without Inputs <span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span></strong>" : "") + "\n        " + (currentStepAttr ? "<strong class=\"f-text-white\">Current Step Text <span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span></strong>" : "") + "\n        " + (totalStepAttr ? "<strong class=\"f-text-white\">Total Step Text <span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span></strong>" : "") + "\n        " + (enterAttr ? "<strong class=\"f-text-white\">Press \"Enter\" To Progress <span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span></strong>" : "") + "\n        " + (submitAttr ? "<strong class=\"f-text-white\">Press \"⌘ + Enter \" To Submit <span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span></strong>" : "") + "\n        " + (radioSkipAttr ? "<strong class=\"f-text-white\">Radio Inputs <span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span></strong>" : "") + "\n        " + (customCheckboxAttr ? "<strong class=\"f-text-white\">Checkboxes <span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span></strong>" : "") + "\n        " + (recapatchaAttr ? "<strong class=\"f-text-white\">ReCAPTCHA <span class=\"f-icon-embed-xxsmall w-embed\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ic\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z\"></path></svg></span></strong>" : "") + "\n      </div>\n    </div>\n  </div>\n";

function openNav() {
    document.getElementById("f-mySidenav").style.width = "35%";
    document.getElementById("f-mySidenav").style.padding = "12px";
}

function closeNav() {
    document.getElementById("f-mySidenav").style.width = "0";
    document.getElementById("f-mySidenav").style.padding = "0px";
}
