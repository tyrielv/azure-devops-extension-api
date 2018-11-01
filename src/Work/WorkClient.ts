﻿/*
 * ---------------------------------------------------------
 * Copyright(C) Microsoft Corporation. All rights reserved.
 * ---------------------------------------------------------
 */

import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";

import TfsCore = require("../Core/Core");
import Work = require("../Work/Work");

export class WorkRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions) {
        super(options);
    }

    public static readonly RESOURCE_AREA_ID = "1d4f49f9-02b9-4e26-b826-2cdb6195f2a9";

    /**
     * Gets backlog configuration for a team
     * 
     * @param teamContext - The team context for the operation
     */
    public async getBacklogConfigurations(
        teamContext: TfsCore.TeamContext
        ): Promise<Work.BacklogConfiguration> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BacklogConfiguration>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/backlogconfiguration",
            routeValues: {
                project: project,
                team: team
            }
        });
    }

    /**
     * Get a list of work items within a backlog level
     * 
     * @param teamContext - The team context for the operation
     * @param backlogId - 
     */
    public async getBacklogLevelWorkItems(
        teamContext: TfsCore.TeamContext,
        backlogId: string
        ): Promise<Work.BacklogLevelWorkItems> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BacklogLevelWorkItems>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/backlogs/{backlogId}/workItems",
            routeValues: {
                project: project,
                team: team,
                backlogId: backlogId
            }
        });
    }

    /**
     * Get a backlog level
     * 
     * @param teamContext - The team context for the operation
     * @param id - The id of the backlog level
     */
    public async getBacklog(
        teamContext: TfsCore.TeamContext,
        id: string
        ): Promise<Work.BacklogLevelConfiguration> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BacklogLevelConfiguration>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/backlogs/{id}",
            routeValues: {
                project: project,
                team: team,
                id: id
            }
        });
    }

    /**
     * List all backlog levels
     * 
     * @param teamContext - The team context for the operation
     */
    public async getBacklogs(
        teamContext: TfsCore.TeamContext
        ): Promise<Work.BacklogLevelConfiguration[]> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BacklogLevelConfiguration[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/backlogs/{id}",
            routeValues: {
                project: project,
                team: team
            }
        });
    }

    /**
     * Get available board columns in a project
     * 
     * @param project - Project ID or project name
     */
    public async getColumnSuggestedValues(
        project?: string
        ): Promise<Work.BoardSuggestedValue[]> {

        return this.beginRequest<Work.BoardSuggestedValue[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/_apis/work/boardcolumns",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Returns the list of parent field filter model for the given list of workitem ids
     * 
     * @param teamContext - The team context for the operation
     * @param childBacklogContextCategoryRefName - 
     * @param workitemIds - 
     */
    public async getBoardMappingParentItems(
        teamContext: TfsCore.TeamContext,
        childBacklogContextCategoryRefName: string,
        workitemIds: number[]
        ): Promise<Work.ParentChildWIMap[]> {

        const queryValues: any = {
            childBacklogContextCategoryRefName: childBacklogContextCategoryRefName,
            workitemIds: workitemIds && workitemIds.join(",")
        };

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.ParentChildWIMap[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/boards/boardparents",
            routeValues: {
                project: project,
                team: team
            },
            queryParams: queryValues
        });
    }

    /**
     * Get available board rows in a project
     * 
     * @param project - Project ID or project name
     */
    public async getRowSuggestedValues(
        project?: string
        ): Promise<Work.BoardSuggestedValue[]> {

        return this.beginRequest<Work.BoardSuggestedValue[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/_apis/work/boardrows",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Get board
     * 
     * @param teamContext - The team context for the operation
     * @param id - identifier for board, either board's backlog level name (Eg:"Stories") or Id
     */
    public async getBoard(
        teamContext: TfsCore.TeamContext,
        id: string
        ): Promise<Work.Board> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.Board>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/boards/{id}",
            routeValues: {
                project: project,
                team: team,
                id: id
            }
        });
    }

    /**
     * Get boards
     * 
     * @param teamContext - The team context for the operation
     */
    public async getBoards(
        teamContext: TfsCore.TeamContext
        ): Promise<Work.BoardReference[]> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BoardReference[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/boards/{id}",
            routeValues: {
                project: project,
                team: team
            }
        });
    }

    /**
     * Update board options
     * 
     * @param options - options to updated
     * @param teamContext - The team context for the operation
     * @param id - identifier for board, either category plural name (Eg:"Stories") or guid
     */
    public async setBoardOptions(
        options: { [key: string] : string; },
        teamContext: TfsCore.TeamContext,
        id: string
        ): Promise<{ [key: string] : string; }> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<{ [key: string] : string; }>({
            apiVersion: "5.0-preview.1",
            method: "PUT",
            routeTemplate: "{project}/{team}/_apis/work/boards/{id}",
            routeValues: {
                project: project,
                team: team,
                id: id
            },
            body: options
        });
    }

    /**
     * Get board user settings for a board id
     * 
     * @param teamContext - The team context for the operation
     * @param board - Board ID or Name
     */
    public async getBoardUserSettings(
        teamContext: TfsCore.TeamContext,
        board: string
        ): Promise<Work.BoardUserSettings> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BoardUserSettings>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/boardusersettings",
            routeValues: {
                project: project,
                team: team,
                board: board
            }
        });
    }

    /**
     * Update board user settings for the board id
     * 
     * @param boardUserSettings - 
     * @param teamContext - The team context for the operation
     * @param board - 
     */
    public async updateBoardUserSettings(
        boardUserSettings: { [key: string] : string; },
        teamContext: TfsCore.TeamContext,
        board: string
        ): Promise<Work.BoardUserSettings> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BoardUserSettings>({
            apiVersion: "5.0-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/boardusersettings",
            routeValues: {
                project: project,
                team: team,
                board: board
            },
            body: boardUserSettings
        });
    }

    /**
     * Get a team's capacity
     * 
     * @param teamContext - The team context for the operation
     * @param iterationId - ID of the iteration
     */
    public async getCapacities(
        teamContext: TfsCore.TeamContext,
        iterationId: string
        ): Promise<Work.TeamMemberCapacity[]> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.TeamMemberCapacity[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{iterationId}/capacities/{teamMemberId}",
            routeValues: {
                project: project,
                team: team,
                iterationId: iterationId
            }
        });
    }

    /**
     * Get a team member's capacity
     * 
     * @param teamContext - The team context for the operation
     * @param iterationId - ID of the iteration
     * @param teamMemberId - ID of the team member
     */
    public async getCapacity(
        teamContext: TfsCore.TeamContext,
        iterationId: string,
        teamMemberId: string
        ): Promise<Work.TeamMemberCapacity> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.TeamMemberCapacity>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{iterationId}/capacities/{teamMemberId}",
            routeValues: {
                project: project,
                team: team,
                iterationId: iterationId,
                teamMemberId: teamMemberId
            }
        });
    }

    /**
     * Replace a team's capacity
     * 
     * @param capacities - Team capacity to replace
     * @param teamContext - The team context for the operation
     * @param iterationId - ID of the iteration
     */
    public async replaceCapacities(
        capacities: Work.TeamMemberCapacity[],
        teamContext: TfsCore.TeamContext,
        iterationId: string
        ): Promise<Work.TeamMemberCapacity[]> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.TeamMemberCapacity[]>({
            apiVersion: "5.0-preview.1",
            method: "PUT",
            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{iterationId}/capacities/{teamMemberId}",
            routeValues: {
                project: project,
                team: team,
                iterationId: iterationId
            },
            body: capacities
        });
    }

    /**
     * Update a team member's capacity
     * 
     * @param patch - Updated capacity
     * @param teamContext - The team context for the operation
     * @param iterationId - ID of the iteration
     * @param teamMemberId - ID of the team member
     */
    public async updateCapacity(
        patch: Work.CapacityPatch,
        teamContext: TfsCore.TeamContext,
        iterationId: string,
        teamMemberId: string
        ): Promise<Work.TeamMemberCapacity> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.TeamMemberCapacity>({
            apiVersion: "5.0-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{iterationId}/capacities/{teamMemberId}",
            routeValues: {
                project: project,
                team: team,
                iterationId: iterationId,
                teamMemberId: teamMemberId
            },
            body: patch
        });
    }

    /**
     * Get board card Rule settings for the board id or board by name
     * 
     * @param teamContext - The team context for the operation
     * @param board - 
     */
    public async getBoardCardRuleSettings(
        teamContext: TfsCore.TeamContext,
        board: string
        ): Promise<Work.BoardCardRuleSettings> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BoardCardRuleSettings>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/cardrulesettings",
            routeValues: {
                project: project,
                team: team,
                board: board
            }
        });
    }

    /**
     * Update board card Rule settings for the board id or board by name
     * 
     * @param boardCardRuleSettings - 
     * @param teamContext - The team context for the operation
     * @param board - 
     */
    public async updateBoardCardRuleSettings(
        boardCardRuleSettings: Work.BoardCardRuleSettings,
        teamContext: TfsCore.TeamContext,
        board: string
        ): Promise<Work.BoardCardRuleSettings> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BoardCardRuleSettings>({
            apiVersion: "5.0-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/cardrulesettings",
            routeValues: {
                project: project,
                team: team,
                board: board
            },
            body: boardCardRuleSettings
        });
    }

    /**
     * Get board card settings for the board id or board by name
     * 
     * @param teamContext - The team context for the operation
     * @param board - 
     */
    public async getBoardCardSettings(
        teamContext: TfsCore.TeamContext,
        board: string
        ): Promise<Work.BoardCardSettings> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BoardCardSettings>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/cardsettings",
            routeValues: {
                project: project,
                team: team,
                board: board
            }
        });
    }

    /**
     * Update board card settings for the board id or board by name
     * 
     * @param boardCardSettingsToSave - 
     * @param teamContext - The team context for the operation
     * @param board - 
     */
    public async updateBoardCardSettings(
        boardCardSettingsToSave: Work.BoardCardSettings,
        teamContext: TfsCore.TeamContext,
        board: string
        ): Promise<Work.BoardCardSettings> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BoardCardSettings>({
            apiVersion: "5.0-preview.1",
            method: "PUT",
            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/cardsettings",
            routeValues: {
                project: project,
                team: team,
                board: board
            },
            body: boardCardSettingsToSave
        });
    }

    /**
     * Get a board chart
     * 
     * @param teamContext - The team context for the operation
     * @param board - Identifier for board, either board's backlog level name (Eg:"Stories") or Id
     * @param name - The chart name
     */
    public async getBoardChart(
        teamContext: TfsCore.TeamContext,
        board: string,
        name: string
        ): Promise<Work.BoardChart> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BoardChart>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/charts/{name}",
            routeValues: {
                project: project,
                team: team,
                board: board,
                name: name
            }
        });
    }

    /**
     * Get board charts
     * 
     * @param teamContext - The team context for the operation
     * @param board - Identifier for board, either board's backlog level name (Eg:"Stories") or Id
     */
    public async getBoardCharts(
        teamContext: TfsCore.TeamContext,
        board: string
        ): Promise<Work.BoardChartReference[]> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BoardChartReference[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/charts/{name}",
            routeValues: {
                project: project,
                team: team,
                board: board
            }
        });
    }

    /**
     * Update a board chart
     * 
     * @param chart - 
     * @param teamContext - The team context for the operation
     * @param board - Identifier for board, either board's backlog level name (Eg:"Stories") or Id
     * @param name - The chart name
     */
    public async updateBoardChart(
        chart: Work.BoardChart,
        teamContext: TfsCore.TeamContext,
        board: string,
        name: string
        ): Promise<Work.BoardChart> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BoardChart>({
            apiVersion: "5.0-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/charts/{name}",
            routeValues: {
                project: project,
                team: team,
                board: board,
                name: name
            },
            body: chart
        });
    }

    /**
     * Get columns on a board
     * 
     * @param teamContext - The team context for the operation
     * @param board - Name or ID of the specific board
     */
    public async getBoardColumns(
        teamContext: TfsCore.TeamContext,
        board: string
        ): Promise<Work.BoardColumn[]> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BoardColumn[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/columns/{id}",
            routeValues: {
                project: project,
                team: team,
                board: board
            }
        });
    }

    /**
     * Update columns on a board
     * 
     * @param boardColumns - List of board columns to update
     * @param teamContext - The team context for the operation
     * @param board - Name or ID of the specific board
     */
    public async updateBoardColumns(
        boardColumns: Work.BoardColumn[],
        teamContext: TfsCore.TeamContext,
        board: string
        ): Promise<Work.BoardColumn[]> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BoardColumn[]>({
            apiVersion: "5.0-preview.1",
            method: "PUT",
            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/columns/{id}",
            routeValues: {
                project: project,
                team: team,
                board: board
            },
            body: boardColumns
        });
    }

    /**
     * Get Delivery View Data
     * 
     * @param project - Project ID or project name
     * @param id - Identifier for delivery view
     * @param revision - Revision of the plan for which you want data. If the current plan is a different revision you will get an ViewRevisionMismatchException exception. If you do not supply a revision you will get data for the latest revision.
     * @param startDate - The start date of timeline
     * @param endDate - The end date of timeline
     */
    public async getDeliveryTimelineData(
        project: string,
        id: string,
        revision?: number,
        startDate?: Date,
        endDate?: Date
        ): Promise<Work.DeliveryViewData> {

        const queryValues: any = {
            revision: revision,
            startDate: startDate,
            endDate: endDate
        };

        return this.beginRequest<Work.DeliveryViewData>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/_apis/work/plans/{id}/deliverytimeline",
            routeValues: {
                project: project,
                id: id
            },
            queryParams: queryValues
        });
    }

    /**
     * Delete a team's iteration by iterationId
     * 
     * @param teamContext - The team context for the operation
     * @param id - ID of the iteration
     */
    public async deleteTeamIteration(
        teamContext: TfsCore.TeamContext,
        id: string
        ): Promise<void> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<void>({
            apiVersion: "5.0-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{id}",
            routeValues: {
                project: project,
                team: team,
                id: id
            }
        });
    }

    /**
     * Get team's iteration by iterationId
     * 
     * @param teamContext - The team context for the operation
     * @param id - ID of the iteration
     */
    public async getTeamIteration(
        teamContext: TfsCore.TeamContext,
        id: string
        ): Promise<Work.TeamSettingsIteration> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.TeamSettingsIteration>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{id}",
            routeValues: {
                project: project,
                team: team,
                id: id
            }
        });
    }

    /**
     * Get a team's iterations using timeframe filter
     * 
     * @param teamContext - The team context for the operation
     * @param timeframe - A filter for which iterations are returned based on relative time. Only Current is supported currently.
     */
    public async getTeamIterations(
        teamContext: TfsCore.TeamContext,
        timeframe?: string
        ): Promise<Work.TeamSettingsIteration[]> {

        const queryValues: any = {
            '$timeframe': timeframe
        };

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.TeamSettingsIteration[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{id}",
            routeValues: {
                project: project,
                team: team
            },
            queryParams: queryValues
        });
    }

    /**
     * Add an iteration to the team
     * 
     * @param iteration - Iteration to add
     * @param teamContext - The team context for the operation
     */
    public async postTeamIteration(
        iteration: Work.TeamSettingsIteration,
        teamContext: TfsCore.TeamContext
        ): Promise<Work.TeamSettingsIteration> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.TeamSettingsIteration>({
            apiVersion: "5.0-preview.1",
            method: "POST",
            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{id}",
            routeValues: {
                project: project,
                team: team
            },
            body: iteration
        });
    }

    /**
     * Add a new plan for the team
     * 
     * @param postedPlan - Plan definition
     * @param project - Project ID or project name
     */
    public async createPlan(
        postedPlan: Work.CreatePlan,
        project: string
        ): Promise<Work.Plan> {

        return this.beginRequest<Work.Plan>({
            apiVersion: "5.0-preview.1",
            method: "POST",
            routeTemplate: "{project}/_apis/work/plans/{id}",
            routeValues: {
                project: project
            },
            body: postedPlan
        });
    }

    /**
     * Delete the specified plan
     * 
     * @param project - Project ID or project name
     * @param id - Identifier of the plan
     */
    public async deletePlan(
        project: string,
        id: string
        ): Promise<void> {

        return this.beginRequest<void>({
            apiVersion: "5.0-preview.1",
            method: "DELETE",
            routeTemplate: "{project}/_apis/work/plans/{id}",
            routeValues: {
                project: project,
                id: id
            }
        });
    }

    /**
     * Get the information for the specified plan
     * 
     * @param project - Project ID or project name
     * @param id - Identifier of the plan
     */
    public async getPlan(
        project: string,
        id: string
        ): Promise<Work.Plan> {

        return this.beginRequest<Work.Plan>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/_apis/work/plans/{id}",
            routeValues: {
                project: project,
                id: id
            }
        });
    }

    /**
     * Get the information for all the plans configured for the given team
     * 
     * @param project - Project ID or project name
     */
    public async getPlans(
        project: string
        ): Promise<Work.Plan[]> {

        return this.beginRequest<Work.Plan[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/_apis/work/plans/{id}",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Update the information for the specified plan
     * 
     * @param updatedPlan - Plan definition to be updated
     * @param project - Project ID or project name
     * @param id - Identifier of the plan
     */
    public async updatePlan(
        updatedPlan: Work.UpdatePlan,
        project: string,
        id: string
        ): Promise<Work.Plan> {

        return this.beginRequest<Work.Plan>({
            apiVersion: "5.0-preview.1",
            method: "PUT",
            routeTemplate: "{project}/_apis/work/plans/{id}",
            routeValues: {
                project: project,
                id: id
            },
            body: updatedPlan
        });
    }

    /**
     * Get process configuration
     * 
     * @param project - Project ID or project name
     */
    public async getProcessConfiguration(
        project: string
        ): Promise<Work.ProcessConfiguration> {

        return this.beginRequest<Work.ProcessConfiguration>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/_apis/work/processconfiguration",
            routeValues: {
                project: project
            }
        });
    }

    /**
     * Get rows on a board
     * 
     * @param teamContext - The team context for the operation
     * @param board - Name or ID of the specific board
     */
    public async getBoardRows(
        teamContext: TfsCore.TeamContext,
        board: string
        ): Promise<Work.BoardRow[]> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BoardRow[]>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/rows/{id}",
            routeValues: {
                project: project,
                team: team,
                board: board
            }
        });
    }

    /**
     * Update rows on a board
     * 
     * @param boardRows - List of board rows to update
     * @param teamContext - The team context for the operation
     * @param board - Name or ID of the specific board
     */
    public async updateBoardRows(
        boardRows: Work.BoardRow[],
        teamContext: TfsCore.TeamContext,
        board: string
        ): Promise<Work.BoardRow[]> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.BoardRow[]>({
            apiVersion: "5.0-preview.1",
            method: "PUT",
            routeTemplate: "{project}/{team}/_apis/work/boards/{board}/rows/{id}",
            routeValues: {
                project: project,
                team: team,
                board: board
            },
            body: boardRows
        });
    }

    /**
     * Get team's days off for an iteration
     * 
     * @param teamContext - The team context for the operation
     * @param iterationId - ID of the iteration
     */
    public async getTeamDaysOff(
        teamContext: TfsCore.TeamContext,
        iterationId: string
        ): Promise<Work.TeamSettingsDaysOff> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.TeamSettingsDaysOff>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{iterationId}/teamdaysoff",
            routeValues: {
                project: project,
                team: team,
                iterationId: iterationId
            }
        });
    }

    /**
     * Set a team's days off for an iteration
     * 
     * @param daysOffPatch - Team's days off patch containting a list of start and end dates
     * @param teamContext - The team context for the operation
     * @param iterationId - ID of the iteration
     */
    public async updateTeamDaysOff(
        daysOffPatch: Work.TeamSettingsDaysOffPatch,
        teamContext: TfsCore.TeamContext,
        iterationId: string
        ): Promise<Work.TeamSettingsDaysOff> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.TeamSettingsDaysOff>({
            apiVersion: "5.0-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{iterationId}/teamdaysoff",
            routeValues: {
                project: project,
                team: team,
                iterationId: iterationId
            },
            body: daysOffPatch
        });
    }

    /**
     * Get a collection of team field values
     * 
     * @param teamContext - The team context for the operation
     */
    public async getTeamFieldValues(
        teamContext: TfsCore.TeamContext
        ): Promise<Work.TeamFieldValues> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.TeamFieldValues>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/teamsettings/teamfieldvalues",
            routeValues: {
                project: project,
                team: team
            }
        });
    }

    /**
     * Update team field values
     * 
     * @param patch - 
     * @param teamContext - The team context for the operation
     */
    public async updateTeamFieldValues(
        patch: Work.TeamFieldValuesPatch,
        teamContext: TfsCore.TeamContext
        ): Promise<Work.TeamFieldValues> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.TeamFieldValues>({
            apiVersion: "5.0-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/{team}/_apis/work/teamsettings/teamfieldvalues",
            routeValues: {
                project: project,
                team: team
            },
            body: patch
        });
    }

    /**
     * Get a team's settings
     * 
     * @param teamContext - The team context for the operation
     */
    public async getTeamSettings(
        teamContext: TfsCore.TeamContext
        ): Promise<Work.TeamSetting> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.TeamSetting>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/teamsettings",
            routeValues: {
                project: project,
                team: team
            }
        });
    }

    /**
     * Update a team's settings
     * 
     * @param teamSettingsPatch - TeamSettings changes
     * @param teamContext - The team context for the operation
     */
    public async updateTeamSettings(
        teamSettingsPatch: Work.TeamSettingsPatch,
        teamContext: TfsCore.TeamContext
        ): Promise<Work.TeamSetting> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.TeamSetting>({
            apiVersion: "5.0-preview.1",
            method: "PATCH",
            routeTemplate: "{project}/{team}/_apis/work/teamsettings",
            routeValues: {
                project: project,
                team: team
            },
            body: teamSettingsPatch
        });
    }

    /**
     * Get work items for iteration
     * 
     * @param teamContext - The team context for the operation
     * @param iterationId - ID of the iteration
     */
    public async getIterationWorkItems(
        teamContext: TfsCore.TeamContext,
        iterationId: string
        ): Promise<Work.IterationWorkItems> {

        const project = teamContext.projectId || teamContext.project;
        const team = teamContext.teamId || teamContext.team;

        return this.beginRequest<Work.IterationWorkItems>({
            apiVersion: "5.0-preview.1",
            routeTemplate: "{project}/{team}/_apis/work/teamsettings/iterations/{iterationId}/workitems",
            routeValues: {
                project: project,
                team: team,
                iterationId: iterationId
            }
        });
    }

}