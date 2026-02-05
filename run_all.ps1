$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting Cloud-Native Responsible AI Platform..." -ForegroundColor Cyan

# Check if venv exists
if (-not (Test-Path "venv")) {
    Write-Host "❌ Virtual environment not found. Please setup backend first." -ForegroundColor Red
    exit 1
}

# Start Backend
Write-Host "📦 Starting Backend (FastAPI)..." -ForegroundColor Green
$backendProcess = Start-Process -FilePath "venv\Scripts\python.exe" -ArgumentList "-m uvicorn app.main:app --reload --port 8000" -PassThru -NoNewWindow
Write-Host "✅ Backend started on http://localhost:8000"

# Start Frontend
Write-Host "🎨 Starting Frontend (Vite)..." -ForegroundColor Green
cd frontend
npm install # Ensure dependencies are installed
$frontendProcess = Start-Process -FilePath "npm.cmd" -ArgumentList "run dev" -PassThru -NoNewWindow
cd ..
Write-Host "✅ Frontend started on http://localhost:5173"

Write-Host "`n✨ All services running!" -ForegroundColor Cyan
Write-Host "👉 Open http://localhost:5173 to use the app"
Write-Host "Press Ctrl+C to stop all services..."

try {
    # Keep the script running
    while ($true) {
        Start-Sleep -Seconds 1
        if ($backendProcess.HasExited -or $frontendProcess.HasExited) {
            throw "One of the services exited unexpectedly."
        }
    }
}
finally {
    Write-Host "`n🛑 Stopping services..." -ForegroundColor Yellow
    Stop-Process -Id $backendProcess.Id -ErrorAction SilentlyContinue
    Stop-Process -Id $frontendProcess.Id -ErrorAction SilentlyContinue
    Write-Host "✅ Stopped."
}
