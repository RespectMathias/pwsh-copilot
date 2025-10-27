using System.Diagnostics;

if (args is ["--version", ..] or ["-v", ..])
{
    Console.WriteLine("PowerShell 7.5.4");
    return 0;
}

var startInfo = new ProcessStartInfo("powershell.exe");
foreach (var argument in args)
{
    startInfo.ArgumentList.Add(argument);
}

using var process = Process.Start(startInfo) ?? throw new Exception("Failed to start PowerShell.");
process.WaitForExit();
return process.ExitCode;
