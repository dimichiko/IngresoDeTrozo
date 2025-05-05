Imports System.Web.UI
Imports System.Data.Entity
Imports DatosCamion

Partial Public Class DbInit
    Inherits Page

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Using db As New CamionDbContext()
            db.Database.CreateIfNotExists()
        End Using

        Response.Write("✅ Base de datos creada correctamente.")
    End Sub
End Class