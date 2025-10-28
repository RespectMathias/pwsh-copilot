#define UNICODE
#include <cwchar>
#include <string_view>
#include <vector>
#include <process.h>

int wmain(int argc, wchar_t *argv[])
{
    if (argc > 1)
    {
        std::wstring_view a1{argv[1]};
        if (a1 == L"--version" || a1 == L"-v")
        {
            wprintf(L"PowerShell 7.5.4\n");
            return 0;
        }
    }

    std::vector<wchar_t *> psArgs;
    psArgs.reserve(static_cast<size_t>(argc) + 1);
    psArgs.push_back(const_cast<wchar_t *>(L"powershell.exe"));
    for (int i = 1; i < argc; ++i)
    {
        psArgs.push_back(argv[i]);
    }
    psArgs.push_back(nullptr);

    int code = _wspawnvp(_P_WAIT, L"powershell.exe", psArgs.data());
    if (code == -1)
        return 1;
    return code;
}
