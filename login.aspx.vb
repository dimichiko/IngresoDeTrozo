Imports System.Xml

Partial Class login
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles Me.Load
        If Not Page.IsPostBack Then
            Try
                Dim xmlPath As String = Server.MapPath("~/xml/version.xml")
                Dim doc As New XmlDocument()
                doc.Load(xmlPath)

                Dim versionNode As XmlNode = doc.SelectSingleNode("//version/number")
                If versionNode IsNot Nothing Then
                    Dim script As String = $"window.__versionText = 'Versión {versionNode.InnerText}';"
                    ClientScript.RegisterStartupScript(Me.GetType(), "versionScript", script, True)
                End If
            Catch
                ClientScript.RegisterStartupScript(Me.GetType(), "versionScript", "window.__versionText = 'Versión desconocida';", True)
            End Try
        End If
    End Sub
End Class