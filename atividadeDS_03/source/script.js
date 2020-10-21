$(function ($) {
    $('#form').on('submit', function () {
        var formulario = $(this);
        if (validaCampos() == 0) {
            $(this).ajaxSubmit({
                dataType: 'json',
                success: function (retorno) {
                    alerta(retorno.mensagem, "success");
                    $("label[for=foto]").css({ backgroundColor: "#f7f7f7" });
                    $("input[type=text], input[type=number], input[type=date], select").css({ backgroundColor: "#f7f7f7" });
                    $("#form select[name=uf]").html("<option value=\"-\">-</option><option value=\"AC\">AC</option><option value=\"AL\">AL</option><option value=\"AP\">AP</option><option value=\"AM\">AM</option><option value=\"BA\">BA</option><option value=\"CE\">CE</option><option value=\"DF\">DF</option><option value=\"ES\">ES</option><option value=\"GO\">GO</option><option value=\"MA\">MA</option><option value=\"MT\">MT</option><option value=\"MS\">MS</option><option value=\"MG\">MG</option><option value=\"PA\">PA</option><option value=\"PB\">PB</option><option value=\"PR\">PR</option><option value=\"PE\">PE</option><option value=\"PI\">PI</option><option value=\"RJ\">RJ</option><option value=\"RN\">RN</option><option value=\"RS\">RS</option><option value=\"RO\">RO</option><option value=\"RR\">RR</option><option value=\"SC\">SC</option><option value=\"SP\">SP</option><option value=\"SE\">SE</option><option value=\"TO\">TO</option>");
                    $(".form_tit").html("Cadastre-se");
                    $(".form_sub").html("Seja um membro da nossa equipe e colabore para a nosso crescimento institucional");
                    formulario.attr("action", "https://mpsilva.000webhostapp.com/webservice/salva.php");
                    $("#form input[type=submit]").val("Cadastrar");
                    formulario.resetForm();
                    refresh_member_list();
                }, error: function (err) {
                    console.log(err);
                    alerta(err, "error");
                }
            });
        } else {
            alerta("Há campos " + validaCampos() + " em branco!", "error");
        }
        return false;
    });
});

$(window).on("load", function () {
    // window.location.href="https://mpsilva.000webhostapp.com/webservice/listar.php";
    $("input[name=telefone]").mask("(00) 00000-0000");
    refresh_member_list();
});

function refresh_member_list() {
    $("#lista_pessoas").html("");
    $.post("https://mpsilva.000webhostapp.com/webservice/listar.php", null, function (retorno) {
        var usuarios = JSON.parse(retorno);
        if (usuarios.length > 0) {
            for (var i = 0; i < usuarios.length; i++) {
                var data = "img/user.png";
                if (usuarios[i].conteudo != null) data = "data:" + usuarios[i].tipo + ";base64," + usuarios[i].conteudo;
                $("#lista_pessoas").append("<tr><td><div style='float: left; width: 10%; margin-right: 3%'><img src='" + data + "' style='width: 100%; border-radius: 50%'></div><div style='width: 80%'>#" + usuarios[i].id + " " + usuarios[i].nome + "</div></td><td>" + usuarios[i].profissao + "</td><td>" + usuarios[i].email + "</td><td>" + usuarios[i].cidade + " (" + usuarios[i].uf + ")</td><td>" + usuarios[i].idade + "</td><td>" + usuarios[i].telefone + "</td></tr>");
            }
        } else {
            $("#lista_pessoas").html("<h5 id=\"usersNull\">NÃO HÁ MEMBROS CADASTRADOS NO MOMENTO</h5>");
        }
    });

}

function alerta(mensagem, tipo) {
    switch (tipo) {
        case "info":
            alert("[INFO] " + mensagem);
            break;
        case "error":
            alert("[ERRO] " + mensagem);
            break;
        case "success":
            alert("- " + mensagem);
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