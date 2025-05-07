Imports System.Web.Services
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports System.Security.Cryptography
Imports System.Text

<ScriptService()>
<WebService(Namespace:="http://altohorizonte.com/")>
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
Public Class AuthService
    Inherits WebService

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Function Login(username As String, password As String) As String
        Dim response As New LoginResponse()

        ' Simulación de usuarios (puedes reemplazar esto por lectura desde archivo JSON/XML si deseas)
        Dim usuarios As New Dictionary(Of String, String) From {
            {"admin", "1234"},
            {"usuario", "clave"}
        }

        If String.IsNullOrEmpty(username) OrElse String.IsNullOrEmpty(password) Then
            response.Success = False
            response.Message = "Nombre de usuario y contraseña son requeridos"
        ElseIf usuarios.ContainsKey(username) AndAlso usuarios(username) = password Then
            HttpContext.Current.Session("UsuarioId") = 1
            HttpContext.Current.Session("NombreUsuario") = username
            response.Success = True
            response.Message = "Inicio de sesión exitoso"
            response.RedirectUrl = "inicio.aspx"
        Else
            response.Success = False
            response.Message = "Usuario o contraseña incorrectos"
        End If

        Return New JavaScriptSerializer().Serialize(response)
    End Function

    Public Class LoginResponse
        Public Property Success As Boolean
        Public Property Message As String
        Public Property RedirectUrl As String
    End Class
End Class
