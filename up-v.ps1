$ruta = "version.jsx"
$contenido = Get-Content $ruta -Raw
$regex = 'return "(\d+)\.(\d+)\.(\d+)"'

if ($contenido -match $regex) {
    $major = [int]$matches[1]
    $minor = [int]$matches[2]
    $patch = [int]$matches[3] + 1

    $nuevaVersion = "$major.$minor.$patch"

    $nuevoContenido = $contenido -replace $regex, "return `"$nuevaVersion`""
    Set-Content $ruta $nuevoContenido

    Write-Host "Nueva version: $nuevaVersion"
} else {
    Write-Host "No se encontro la version."
}
