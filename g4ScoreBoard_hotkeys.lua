--[[
      OBS Studio Lua script : Control the g4ScoreBoard with hotkeys
            
--]]


local obs = obslua
local debug
local hk = {}
local hotkeyP1ScoreUp = 0;
local hotkeyP1ScoreDown = 0;
local hotkeyP2ScoreUp = 0;
local hotkeyP2ScoreDown = 0;
local hotkeyScoreReset = 0;
local hotkeyP1Extension = 0;
local hotkeyP2Extension = 0;
local hotkey30Clock = 0;
local hotkey60Clock = 0;
local hotkeyStopClock = 0;
local hotkeySwap = 0;


local hotkeys = {
	P1_SCR_UP = "G4 - Player 1 Score +1",
	P1_SCR_DOWN = "G4 - Player 1 Score -1",
	P2_SCR_UP = "G4 - Player 2 Score +1",
	P2_SCR_DOWN = "G4 - Player 2 Score -1",
	SCR_RESET = "G4 - Score Reset",
	P1_EXT = "G4 - Player 1 Extension",
	P2_EXT = "G4 - Player 2 Extension",
	CLOCK_30 = "G4 - 30 Second Shot Clock Start",
	CLOCK_60 = "G4 - 60 Second Shot Clock Start",
	STOP_CLK = "G4 - Stop Clock",
	SWAP_CLR = "G4 - Swap Player Colors",
		
}

-- add any custom actions here
local function onHotKey(action)
	--obs.timer_remove(rotate)
	if debug then obs.script_log(obs.LOG_INFO, string.format("Hotkey : %s", action)) end

	if action == "P1_SCR_UP" then
		if hotkeyP1ScoreUp == 0 then
			hotkeyP1ScoreUp = 1
		else
			hotkeyP1ScoreUp = 0
		end
		update_hotkeys_js()
	elseif action == "P1_SCR_DOWN" then
		if hotkeyP1ScoreDown == 0 then
			hotkeyP1ScoreDown = 1
		else
			hotkeyP1ScoreDown = 0
		end
		update_hotkeys_js()
	elseif action == "P2_SCR_UP" then
		if hotkeyP2ScoreUp == 0 then
			hotkeyP2ScoreUp = 1
		else
			hotkeyP2ScoreUp = 0
		end
		update_hotkeys_js()
	elseif action == "P2_SCR_DOWN" then
		if hotkeyP2ScoreDown == 0 then
			hotkeyP2ScoreDown = 1
		else
			hotkeyP2ScoreDown = 0
		end
		update_hotkeys_js()
	elseif action == "SCR_RESET" then
		if hotkeyScoreReset == 0 then
			hotkeyScoreReset = 1
		else
			hotkeyScoreReset = 0
		end
		update_hotkeys_js()
	elseif action == "P1_EXT" then
		if hotkeyP1Extension == 0 then
			hotkeyP1Extension = 1
		else
			hotkeyP1Extension = 0
		end
		update_hotkeys_js()
	elseif action == "P2_EXT" then
		if hotkeyP2Extension == 0 then
			hotkeyP2Extension = 1
		else
			hotkeyP2Extension = 0
		end
		update_hotkeys_js()
	elseif action == "CLOCK_30" then
		if hotkey30Clock == 0 then
			hotkey30Clock = 1
		else
			hotkey30Clock = 0
		end
		update_hotkeys_js()
	elseif action == "CLOCK_60" then
		if hotkey60Clock == 0 then
			hotkey60Clock = 1
		else
			hotkey60Clock = 0
		end
		update_hotkeys_js()
	elseif action == "STOP_CLK" then
		if hotkeyStopClock == 0 then
			hotkeyStopClock = 1
		else
			hotkeyStopClock = 0
		end
		update_hotkeys_js()
	elseif action == "SWAP_CLR" then
		if hotkeySwap == 0 then
			hotkeySwap = 1
		else
			hotkeySwap = 0
		end
		update_hotkeys_js()
	end
end


-- write settings to js file
function update_hotkeys_js()
    local output = assert(io.open(script_path() .. 'hotkeys.js', "w"))
    output:write('hotkeyP1ScoreUp = '.. hotkeyP1ScoreUp .. ';\n')
    output:write('hotkeyP1ScoreDown = '.. hotkeyP1ScoreDown .. ';\n')
    output:write('hotkeyP2ScoreUp = '.. hotkeyP2ScoreUp .. ';\n')
    output:write('hotkeyP2ScoreDown = '.. hotkeyP2ScoreDown .. ';\n')
	output:write('hotkeyScoreReset = '.. hotkeyScoreReset .. ';\n')
	output:write('hotkeyP1Extension = '.. hotkeyP1Extension .. ';\n')
	output:write('hotkeyP2Extension = '.. hotkeyP2Extension .. ';\n')
	output:write('hotkey30Clock = '.. hotkey30Clock .. ';\n')
	output:write('hotkey60Clock = '.. hotkey60Clock .. ';\n')
	output:write('hotkeyStopClock = '.. hotkeyStopClock .. ';\n')
	output:write('hotkeySwap = '.. hotkeySwap .. ';\n')
	output:close()
end

----------------------------------------------------------

-- called on startup
function script_load(settings)
	function pairsByKeys (t, f)
		local a = {}
		for n in pairs(t) do table.insert(a, n) end
		table.sort(a, f)
		local i = 0
		local iter = function ()
		  i = i + 1
		  if a[i] == nil then return nil
		  else return a[i], t[a[i]]
		  end
		end
		return iter
	end	

	for name, line in pairsByKeys(hotkeys) do
		hk[name] = obs.obs_hotkey_register_frontend(name, line, function(pressed) if pressed then onHotKey(name) end end)
		local hotkeyArray = obs.obs_data_get_array(settings, name)
		obs.obs_hotkey_load(hk[name], hotkeyArray)
		obs.obs_data_array_release(hotkeyArray)
	end	
	update_hotkeys_js()
end


-- called on unload
function script_unload()
end


-- called when settings changed
function script_update(settings)
	debug = obs.obs_data_get_bool(settings, "debug")
end


-- return description shown to user
function script_description()
	return "Control the g4ScoreBoard with hotkeys"
end


-- define properties that user can change
function script_properties()
	local props = obs.obs_properties_create()
	obs.obs_properties_add_bool(props, "debug", "Debug")
	return props
end


-- set default values
function script_defaults(settings)
	obs.obs_data_set_default_bool(settings, "debug", false)
end


-- save additional data not set by user
function script_save(settings)
	for k, v in pairs(hotkeys) do
		local hotkeyArray = obs.obs_hotkey_save(hk[k])
		obs.obs_data_set_array(settings, k, hotkeyArray)
		obs.obs_data_array_release(hotkeyArray)
	end
end