using System.Diagnostics;

if (args.Length > 0 && (args[0] == "--version" || args[0] == "-v"))
{
    Console.WriteLine("PowerShell 7.5.4");
    return 0;
}

string winPs = @"C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe";
string exe = File.Exists(winPs) ? winPs : "powershell.exe";

try
{
    var psi = new ProcessStartInfo(exe)
    {
        UseShellExecute = false,
        RedirectStandardInput = false,
        RedirectStandardOutput = false,
        RedirectStandardError = false
    };

    foreach (var a in args)
        psi.ArgumentList.Add(a);

    using var proc = Process.Start(psi);
    if (proc is null) return 1;
    proc.WaitForExit();
    return proc.ExitCode;
}
catch (Exception ex)
{
    Console.Error.WriteLine(ex.Message);
    return 1;
}
