<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="ConteoTroncos.aspx.vb" Inherits="ingresodetrozos.ConteoTroncos" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Conteo de Troncos</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/5.3.3/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="Content/style.css" />
    <style>
        .home-container {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(3, 1fr);
            gap: 0;
            height: 100vh;
        }
        .home-container > div {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .home-container > div > button {
            width: 100%;
            height: 100%;
            border: 1px solid black;
        }
        @media (max-width: 767px) {
            .home-container {
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(6, 1fr);
            }
            .home-container > div > button {
                height: 50px;
            }
        }
        .counter {
            margin-left: 5px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="home-container">
            <div>
                <button type="button" class="home-button16 btn btn-block" onclick="updateCounter(16, 'increment')">Diámetro 16</button>
                <span id="count-16" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button18 btn btn-block" onclick="updateCounter(18, 'increment')">Diámetro 18</button>
                <span id="count-18" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button22 btn btn-block" onclick="updateCounter(22, 'increment')">Diámetro 22</button>
                <span id="count-22" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button20 btn btn-block" onclick="updateCounter(20, 'increment')">Diámetro 20</button>
                <span id="count-20" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button24 btn btn-block" onclick="updateCounter(24, 'increment')">Diámetro 24</button>
                <span id="count-24" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button26 btn btn-block" onclick="updateCounter(26, 'increment')">Diámetro 26</button>
                <span id="count-26" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button28 btn btn-block" onclick="updateCounter(28, 'increment')">Diámetro 28</button>
                <span id="count-28" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button30 btn btn-block" onclick="updateCounter(30, 'increment')">Diámetro 30</button>
                <span id="count-30" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button32 btn btn-block" onclick="updateCounter(32, 'increment')">Diámetro 32</button>
                <span id="count-32" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button34 btn btn-block" onclick="updateCounter(34, 'increment')">Diámetro 34</button>
                <span id="count-34" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button36 btn btn-block" onclick="updateCounter(36, 'increment')">Diámetro 36</button>
                <span id="count-36" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button38 btn btn-block" onclick="updateCounter(38, 'increment')">Diámetro 38</button>
                <span id="count-38" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button40 btn btn-block" onclick="updateCounter(40, 'increment')">Diámetro 40</button>
                <span id="count-40" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button42 btn btn-block" onclick="updateCounter(42, 'increment')">Diámetro 42</button>
                <span id="count-42" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button44 btn btn-block" onclick="updateCounter(44, 'increment')">Diámetro 44</button>
                <span id="count-44" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button46 btn btn-block" onclick="updateCounter(46, 'increment')">Diámetro 46</button>
                <span id="count-46" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button48 btn btn-block" onclick="updateCounter(48, 'increment')">Diámetro 48</button>
                <span id="count-48" class="counter">0</span>
            </div>
            <div>
                <button type="button" class="home-button-1 btn btn-block" onclick="updateCounter(getLastDiameter(), 'decrement')">-1</button>
            </div>
        </div>
        <div class="text-center mt-3">
            <asp:Button ID="btnResumen" runat="server" Text="Ver Resumen" CssClass="btn btn-primary" OnClick="btnResumen_Click" />
        </div>
    </form>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="Scripts/contadorTroncos.js"></script>
</body>
</html>














