/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.command.MaintenanceLogFormData;
import com.solairis.yourcarslife.data.domain.MaintenanceLog;
import com.solairis.yourcarslife.data.domain.Tag;
import com.solairis.yourcarslife.service.LogService;
import com.solairis.yourcarslife.service.TagService;
import com.solairis.yourcarslife.service.VehicleService;
import java.beans.PropertyEditor;
import java.util.Date;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Joshua Johnson
 */
@Controller
public class MaintenanceLogController {

	@Autowired
	private LogService logService;
	@Autowired
	private TagService tagService;
	@Autowired
	private VehicleService vehicleService;
	@Autowired
	private PropertyEditor customDateEditor;

	@InitBinder
	protected void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(Date.class, customDateEditor);
	}

	@RequestMapping(value = "/vehicle/{vehicleId}/log/maintenance/{logId}", method = RequestMethod.GET)
	@Transactional
	public String form(@PathVariable("vehicleId") long vehicleId, @PathVariable("logId") Long logId, @ModelAttribute MaintenanceLogFormData formData, Model model) {
		if (logId != null && logId != 0) {
			MaintenanceLog log = logService.getMaintenanceLog(logId);
			formData.setDescription(log.getDescription());
			formData.setLogDate(log.getLogDate());
			formData.setOdometer(log.getOdometer());
			formData.setSummary(log.getSummary());
			for (Tag tag : log.getTags()) {
				formData.getTagIds().add(tag.getTagId());
			}
		} else {
			model.addAttribute("lastLog", logService.getMostRecentLogForVehicle(vehicleId));
		}
		referenceData(vehicleId, model);
		return "maintenance-log";
	}

	@RequestMapping(value = "/vehicle/{vehicleId}/log/maintenance/{logId}", method = RequestMethod.POST)
	@Transactional
	public String submit(@PathVariable("vehicleId") long vehicleId, @PathVariable("logId") Long logId, @Valid MaintenanceLogFormData formData, BindingResult errors, Model model) {
		MaintenanceLog log = null;
		if (!errors.hasErrors()) {
			if (logId == null || logId == 0) {
				log = new MaintenanceLog();
				log.setActive(true);
				log.setVehicle(vehicleService.getVehicle(vehicleId));
			} else {
				log = logService.getMaintenanceLog(logId);
			}
			log.setDescription(formData.getDescription());
			log.setLogDate(formData.getLogDate());
			log.setOdometer(formData.getOdometer());
			log.setSummary(formData.getSummary());
			log.getTags().clear();
			if (formData.getTagIds() != null) {
				for (Long tagId : formData.getTagIds()) {
					log.getTags().add(tagService.getTag(tagId));
				}
			}
			logService.save(log);
			model.addAttribute("saved", true);
		}
		referenceData(vehicleId, model);
		return errors.hasErrors() ? "maintenance-log" : "redirect:/vehicle/" + vehicleId + "/log/maintenance/" + (log == null ? "" : log.getLogId());
	}

	@RequestMapping(value = "/vehicle/{vehicleId}/log/maintenance", method = RequestMethod.GET)
	@Transactional
	@ResponseBody
	public List<MaintenanceLog> listBody(@PathVariable("vehicleId") long vehicleId, Model model) {
		return logService.getMaintenanceLogsForVehicle(vehicleId, 1, 100);
	}

	@RequestMapping(value = "/vehicle/{vehicleId}/log/maintenance/{logId}", method = RequestMethod.PUT)
	@Transactional
	@ResponseBody
	public MaintenanceLog put(@PathVariable("vehicleId") long vehicleId, @PathVariable("logId") long logId, @RequestBody MaintenanceLog log, Model model) {
		if (logId != log.getLogId()) {
			throw new IllegalArgumentException("Param Log ID ("+logId+") does not match Request Body Log ID ("+log.getLogId()+")");
		}
		logService.save(log);
		return log;
	}

	@RequestMapping(value = "/vehicle/{vehicleId}/log/maintenance", method = RequestMethod.POST)
	@Transactional
	@ResponseBody
	public MaintenanceLog save(@PathVariable("vehicleId") long vehicleId, @RequestBody MaintenanceLog log, Model model) {
		log.setVehicle(vehicleService.getVehicle(vehicleId));
		logService.save(log);
		return log;
	}

	private void referenceData(long vehicleId, Model model) {
		model.addAttribute("vehicle", vehicleService.getVehicle(vehicleId));
		model.addAttribute("userTags", tagService.getTagsForUser(Long.parseLong(((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername())));
	}
}
