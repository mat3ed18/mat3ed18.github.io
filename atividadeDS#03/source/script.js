$(function ($) {
    $('#form').on('submit', function () {
        var formulario = $(this);
        if (validaCampos() == 0) {
            $(this).ajaxSubmit({
                dataType: 'json',
                success: function (retorno) {
                    alerta(retorno.mensagem, "success", 3000);
                    $("label[for=foto]").css({backgroundColor: "white"});
                    $("input[type=text], input[type=number], input[type=date], select").css({backgroundColor: "white"});
                    $("#form select[name=uf]").html("<option value=\"-\">-</option><option value=\"AC\">AC</option><option value=\"AL\">AL</option><option value=\"AP\">AP</option><option value=\"AM\">AM</option><option value=\"BA\">BA</option><option value=\"CE\">CE</option><option value=\"DF\">DF</option><option value=\"ES\">ES</option><option value=\"GO\">GO</option><option value=\"MA\">MA</option><option value=\"MT\">MT</option><option value=\"MS\">MS</option><option value=\"MG\">MG</option><option value=\"PA\">PA</option><option value=\"PB\">PB</option><option value=\"PR\">PR</option><option value=\"PE\">PE</option><option value=\"PI\">PI</option><option value=\"RJ\">RJ</option><option value=\"RN\">RN</option><option value=\"RS\">RS</option><option value=\"RO\">RO</option><option value=\"RR\">RR</option><option value=\"SC\">SC</option><option value=\"SP\">SP</option><option value=\"SE\">SE</option><option value=\"TO\">TO</option>");
                    $(".form_tit").html("Cadastre-se");
                    $(".form_sub").html("Seja um membro da nossa equipe e colabore para a nosso crescimento institucional");
                    formulario.attr("action", "https://mpsilva.000webhostapp.com/webservice/salva.php");
                    $("#form input[type=submit]").val("Cadastrar");
                    formulario.resetForm();
                    refresh_member_list();
                }, error: function (err) {
                    console.log(err);
                    alerta(err, "error", 3000);
                }
            });
        } else {
            alerta("Há campos " + validaCampos() + " em branco!", "error", 3000);
        }
        return false;
    });
});

$(window).on("load", function () {
    // window.location.href="https://mpsilva.000webhostapp.com/webservice/listar.php";
    alerta("Seja BEM-VINDO ao INOVA CPS", "success", 10000);
    $("input[name=telefone]").mask("(00) 00000-0000");
    $(".row:nth-child(1) img").fadeIn(1000);
    setTimeout(function () {
        $(".row:nth-child(2) .col-5:not(.second_child) img:nth-child(1)").fadeIn(1000);
        setTimeout(function () {
            $(".row:nth-child(2) .col-5:not(.second_child) img:nth-child(2)").fadeIn(1000);
            setTimeout(function () {
                $(".row:nth-child(2) .second_child img:nth-child(1)").fadeIn(1000);
                setTimeout(function () {
                    $(".row:nth-child(2) .second_child img:nth-child(2)").fadeIn(1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
    refresh_member_list();
});

function refresh_member_list() {
    $(".members_list").html("");
    $.post("https://mpsilva.000webhostapp.com/webservice/listar.php", null, function (retorno) {
        var usuarios = JSON.parse(retorno);
        if (usuarios.length > 0) {
            for (var i = 0; i < usuarios.length; i++) {
                var data = "img/user.png";
                if (usuarios[i].conteudo != null)
                    data = "data:" + usuarios[i].tipo + ";base64," + usuarios[i].conteudo;
                var image = "<img class=\"col-4\" id=\"" + usuarios[i].id + "\" src=\"" + data + "\" nome=\"" + usuarios[i].nome + "\" profissao=\"" + usuarios[i].profissao + "\" email=\"" + usuarios[i].email + "\" cidade=\"" + usuarios[i].cidade + "\" uf=\"" + usuarios[i].uf + "\" idade=\"" + usuarios[i].idade + "\" dt_nascimento=\"" + usuarios[i].dt_nascimento + "\" telefone=\"" + usuarios[i].telefone + "\" fotoId=\"" + usuarios[i].foto_id + "\">";
                var label = "<div class=\"col-8\"><h5 id=\"" + usuarios[i].id + "\" src=\"" + data + "\" nome=\"" + usuarios[i].nome + "\" profissao=\"" + usuarios[i].profissao + "\" email=\"" + usuarios[i].email + "\" cidade=\"" + usuarios[i].cidade + "\" uf=\"" + usuarios[i].uf + "\" idade=\"" + usuarios[i].idade + "\" dt_nascimento=\"" + usuarios[i].dt_nascimento + "\" telefone=\"" + usuarios[i].telefone + "\" fotoId=\"" + usuarios[i].foto_id + "\">" + usuarios[i].nome + "</h5><h6>" + usuarios[i].profissao + " - " + usuarios[i].cidade + " (" + usuarios[i].uf + ")</h6></div>";
                $(".members_list").append(image + label);
            }
        } else {
            $(".members_list").html("<h5 id=\"usersNull\">NÃO HÁ MEMBROS CADASTRADOS NO MOMENTO</h5>");
        }
    });

}

function alerta(mensagem, tipo, tempo) {
    switch (tipo) {
        case "info":
            $(".alerta").html("<i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i> " + mensagem);
            $(".alerta").fadeIn(1000);
            setTimeout(function () {
                $(".alerta").fadeOut(1000);
            }, tempo);
            break;
        case "error":
            $(".alerta").html("<i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> " + mensagem);
            $(".alerta").fadeIn(1000);
            setTimeout(function () {
                $(".alerta").fadeOut(1000);
            }, tempo);
            break;
        case "success":
            $(".alerta").html("<i class=\"fa fa-check-circle-o\" aria-hidden=\"true\"></i> " + mensagem);
            $(".alerta").fadeIn(1000);
            setTimeout(function () {
                $(".alerta").fadeOut(1000);
            }, tempo);
            break;
    }
}

$("input[type=file]").change(function () {
    if ($(this).val() != "") {
        $("label[for=foto]").css({backgroundColor: "#C7EA46"});
    } else {
        $("label[for=foto]").css({backgroundColor: "#FFCCCB"});
    }
});

function validaCampos() {
    var cont = 0;
    $("input[type=text], input[type=number], input[type=date], select").map(function () {
        if ($(this).val() == "" || $(this).val() == "-") {
            $(this).css({backgroundColor: "#FFCCCB"});
            cont++;
        } else {
            $(this).css({backgroundColor: "#C7EA46"});
        }
    });
    return cont;
}

$('.row:nth-child(3)').on('click', '#sairEditar', function (event) {
    $(".form_tit").html("Cadastre-se");
    $(".form_sub").html("Seja um membro da nossa equipe e colabore para a nosso crescimento institucional");
    $("#form").attr("action", "https://mpsilva.000webhostapp.com/webservice/salva.php");
    $("#form").resetForm();
    $("#form select[name=uf]").html("<option value=\"-\">-</option><option value=\"AC\">AC</option><option value=\"AL\">AL</option><option value=\"AP\">AP</option><option value=\"AM\">AM</option><option value=\"BA\">BA</option><option value=\"CE\">CE</option><option value=\"DF\">DF</option><option value=\"ES\">ES</option><option value=\"GO\">GO</option><option value=\"MA\">MA</option><option value=\"MT\">MT</option><option value=\"MS\">MS</option><option value=\"MG\">MG</option><option value=\"PA\">PA</option><option value=\"PB\">PB</option><option value=\"PR\">PR</option><option value=\"PE\">PE</option><option value=\"PI\">PI</option><option value=\"RJ\">RJ</option><option value=\"RN\">RN</option><option value=\"RS\">RS</option><option value=\"RO\">RO</option><option value=\"RR\">RR</option><option value=\"SC\">SC</option><option value=\"SP\">SP</option><option value=\"SE\">SE</option><option value=\"TO\">TO</option>");
    $("input[type=text], input[type=number], input[type=date], select").css({backgroundColor: "white"});
    $("#form input[type=submit]").val("Cadastrar");
});

$('.members_list').on('click', 'img, h5', function (event) {
    var formList = $(this);
    function onConfirm(buttonIndex) {
        switch (buttonIndex) {
            case 1:
                navigator.notification.alert("Você escolheu editar", null, "Mensagem", ['OK']);

                $("html, body").animate({scrollTop: ($(".row:nth-child(3)").position().top - 105)}, 1000);

                $(".form_tit").html("Atualiização");
                $(".form_sub").html("Altere os dados cadastrais do usuário abaixo! Caso queira cancelar a edição, clique <button href=\"#\" id=\"sairEditar\">aqui</button>");
                $("#form").attr("action", "https://mpsilva.000webhostapp.com/webservice/editar.php");
                $.post("https://mpsilva.000webhostapp.com/webservice/listar.php", null, function (retorno) {
                    var usuarios = JSON.parse(retorno);
                    var i = 0;
                    while (i < usuarios.length) {
                        if (usuarios[i].id == parseInt(formList.attr("id"))) {
                            $("#form input[name=nome]").val(usuarios[i].nome);
                            $("#form input[name=profissao]").val(usuarios[i].profissao);
                            $("#form input[name=email]").val(usuarios[i].email);
                            $("#form input[name=cidade]").val(usuarios[i].cidade);
                            $("#form select[name=uf] option[value=" + usuarios[i].uf + "]").attr("selected", "selected");
                            $("#form input[name=idade]").val(usuarios[i].idade);
                            $("#form input[name=dt_nascimento]").val(usuarios[i].dt_nascimento.split("/")[2] + "-" + usuarios[i].dt_nascimento.split("/")[1] + "-" + usuarios[i].dt_nascimento.split("/")[0]);
                            $("#form input[name=telefone]").val(usuarios[i].telefone);
                            $("#form input[name=foto_id]").val(usuarios[i].foto_id);
                            $("#form input[name=user_id]").val(usuarios[i].id);
                            break;
                        }
                        i++;
                    }
                });
                $("#form input[type=submit]").val("Atualizar");
                $("input[type=text], input[type=number], input[type=date], select").css({backgroundColor: "white"});
                break;
            case 2:
                if (!(parseInt(formList.attr("fotoId")))) {
                    $.post("https://mpsilva.000webhostapp.com/webservice/excluir.php", {usuarioId: parseInt(formList.attr("id"))}, function (retorno) {
                        var jso = JSON.parse(retorno);
                        navigator.notification.alert(jso.mensagem, null, "Exclusão de registro", ['OK']);
                        setTimeout(function () {
                            window.location.href = "index.html";
                        }, 4000);
                    });
                } else {
                    $.post("https://mpsilva.000webhostapp.com/webservice/excluir.php", {fotoId: parseInt(formList.attr("fotoId")), usuarioId: parseInt(formList.attr("id"))}, function (retorno) {
                        var jso = JSON.parse(retorno);
                        navigator.notification.alert(jso.mensagem, null, "Exclusão de registro", ['OK']);
                        setTimeout(function () {
                            window.location.href = "index.html";
                        }, 4000);
                    });
                }
                break;
            case 3:

                break;
        }
    }
    var info = "código: " + $(this).attr("id");
    info += "\nnome: " + $(this).attr("nome");
    info += "\nprofissao: " + $(this).attr("profissao");
    info += "\nemail: " + $(this).attr("email");
    info += "\ncidade: " + $(this).attr("cidade");
    info += "\nuf: " + $(this).attr("uf");
    info += "\nidade: " + $(this).attr("idade");
    info += "\ndata de nascimento: " + $(this).attr("dt_nascimento");
    info += "\ntelefone: " + $(this).attr("telefone");
    navigator.notification.confirm(info, onConfirm, $(this).attr("nome"), ['Editar', 'Excluir', 'OK']);
});