#include <windows.h>
#include <shlwapi.h>
#include <string>

int wmain()
{
    auto commandLine = GetCommandLineW();
    auto args = PathGetArgsW(commandLine);

    if (*args && (wcscmp(args, L"--version") == 0 || wcscmp(args, L"-v") == 0))
    {
        wprintf(L"PowerShell 7.5.4\n");
        return 0;
    }

    std::wstring command = L"powershell.exe ";
    command += args;

    STARTUPINFOW si = {sizeof(si)};
    PROCESS_INFORMATION pi = {};

    if (!CreateProcessW(nullptr, command.data(), nullptr, nullptr, FALSE, 0, nullptr, nullptr, &si, &pi))
    {
        return GetLastError();
    }

    WaitForSingleObject(pi.hProcess, INFINITE);

    DWORD exitCode;
    GetExitCodeProcess(pi.hProcess, &exitCode);

    CloseHandle(pi.hProcess);
    CloseHandle(pi.hThread);

    return exitCode;
}
